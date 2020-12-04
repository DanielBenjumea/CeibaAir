import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { ExecutionContext, HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { UsuarioControlador } from 'src/infraestructura/usuario/controlador/usuario.controlador';
import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { servicioRegistrarUsuarioProveedor } from 'src/infraestructura/usuario/proveedor/servicio/servicio-registrar-usuario.proveedor';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/comando/registar-usuario.manejador';
import { ManejadorListarUsuario } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';
import { ComandoRegistrarUsuario } from 'src/aplicacion/usuario/comando/registrar-usuario.comando';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { ServicioActualizarMontoUsuario } from 'src/dominio/usuario/servicio/servicio-actualizar-monto-usuario';
import { ManejadorActualizarMontoUsuario } from 'src/aplicacion/usuario/comando/actualizar-monto-usuario.manejador';
import { AuthGuard } from '@nestjs/passport';
import { servicioActualizarMontoUsuarioProveedor } from 'src/infraestructura/usuario/proveedor/servicio/servicio-actualizar-monto-usuario.proveedor';
import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de usuarios', () => {
	let app: INestApplication;
	let repositorioUsuario: SinonStubbedInstance<RepositorioUsuario>;
	let daoUsuario: SinonStubbedInstance<DaoUsuario>;

	/**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
	beforeAll(async () => {
		repositorioUsuario = createStubObj<RepositorioUsuario>(
			[ 'existeNombreUsuario', 'guardar', 'findUsuarioByName', 'actualizarMontoUsuario', 'findUsuarioById' ],
			sinonSandbox
		);
		daoUsuario = createStubObj<DaoUsuario>([ 'listar' ], sinonSandbox);
		const moduleRef = await Test.createTestingModule({
			controllers: [ UsuarioControlador ],
			providers: [
				AppLogger,
				{
					provide: ServicioRegistrarUsuario,
					inject: [ RepositorioUsuario ],
					useFactory: servicioRegistrarUsuarioProveedor
				},
				{
					provide: ServicioActualizarMontoUsuario,
					inject: [ RepositorioUsuario ],
					useFactory: servicioActualizarMontoUsuarioProveedor
				},
				{ provide: RepositorioUsuario, useValue: repositorioUsuario },
				{ provide: DaoUsuario, useValue: daoUsuario },
				ManejadorRegistrarUsuario,
				ManejadorListarUsuario,
				ManejadorActualizarMontoUsuario
			]
		})
			.overrideGuard(AuthGuard('jwt'))
			.useValue({
				canActivate: (context: ExecutionContext) => {
					const req = context.switchToHttp().getRequest();
					req.user = {
						id: 1,
						nombre: 'Daniel',
						
					};
					return true;
				}
			})
			.compile();

		app = moduleRef.createNestApplication();
		const logger = await app.resolve(AppLogger);
		logger.customError = sinonSandbox.stub();
		app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
		await app.init();
	});

	afterEach(() => {
		sinonSandbox.restore();
	});

	afterAll(async () => {
		await app.close();
	});

	it('debería listar los usuarios registrados', () => {
		const usuarios: any[] = [ { nombre: 'Lorem ipsum', fechaCreacion: new Date().toISOString() } ];
		daoUsuario.listar.returns(Promise.resolve(usuarios));

		return request(app.getHttpServer()).get('/usuarios').expect(HttpStatus.OK).expect(usuarios);
	});

	it('debería fallar al registar un usuario clave muy corta', async () => {
		const usuario: ComandoRegistrarUsuario = {
			nombre: 'Lorem ipsum',
			fechaCreacion: new Date().toISOString(),
			clave: '123'
		};
		const mensaje = 'Longitud de clave inválida';

		const response = await request(app.getHttpServer())
			.post('/usuarios')
			.send(usuario)
			.expect(HttpStatus.BAD_REQUEST);
		expect(response.body.message[0].constraints.minLength).toBe(mensaje);
		expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
	});

	it('debería fallar al registar un usuario ya existente', async () => {
		const usuario: ComandoRegistrarUsuario = {
			nombre: 'Lorem ipsum',
			fechaCreacion: new Date().toISOString(),
			clave: '1234'
		};
		const mensaje = `El nombre de usuario ${usuario.nombre} ya existe`;
		repositorioUsuario.existeNombreUsuario.returns(Promise.resolve(true));

		const response = await request(app.getHttpServer())
			.post('/usuarios')
			.send(usuario)
			.expect(HttpStatus.BAD_REQUEST);
		expect(response.body.message).toBe(mensaje);
		expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
	});

	it('deberia fallar al tener un usuario incorrecto', async () => {
		const response = await request(app.getHttpServer())
			.patch('/usuarios/actualizar-monto')
			.send({ monto: 500000 })
			.expect(HttpStatus.BAD_REQUEST);
		const mensaje = 'El usuario no existe';

		expect(response.body.message).toBe(mensaje);
	});

	it('debería fallar al registrar un usuario con más de 1000000 de saldo', async () => {
		const usuario: UsuarioEntidad = {
			id: 1,
			nombre: 'lorem ipsum',
			fechaCreacion: new Date(),
			isAdmin: false,
			clave: 'lorem ipsum',
			monto: 100000

		}
		repositorioUsuario.findUsuarioById.returns(Promise.resolve(usuario))

		const response = await request(app.getHttpServer())
			.patch('/usuarios/actualizar-monto')
			.send({ monto: 5000000 })
			.expect(HttpStatus.BAD_REQUEST);
		const mensaje = 'El monto máximo por usuario es 1000000';

		expect(response.body.message).toBe(mensaje);

	})
});
