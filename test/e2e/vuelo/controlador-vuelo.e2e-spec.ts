import * as request from 'supertest';
import { ExecutionContext, HttpStatus, INestApplication } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { ComandoAgregarVuelo } from 'src/aplicacion/vuelo/comando/agregar-vuelo.comando';
import { ManejadorAgregarVuelo } from 'src/aplicacion/vuelo/comando/agregar-vuelo.manejador';
import { ManejadorEnlistarVuelo } from 'src/aplicacion/vuelo/comando/enlistar-vuelo.manejador';
import { RepositorioVuelo } from 'src/dominio/vuelo/puerto/repositorio/repositorio-vuelo';
import { ServicioAgregarVuelo } from 'src/dominio/vuelo/servicio/servicio-agregar-vuelo';
import { ServicioEnlistarVuelo } from 'src/dominio/vuelo/servicio/servicio-enlistar.vuelo';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { VueloControlador } from 'src/infraestructura/vuelo/controlador/vuelo.controlador';
import { servicioAgregarVueloProveedor } from 'src/infraestructura/vuelo/proveedor/servicio/servicio-agregar-vuelo.proveedor';
import { servicioEnlistarVueloProveedor } from 'src/infraestructura/vuelo/proveedor/servicio/servicio-enlistar-vuelo.proveedor';
import { createStubObj } from 'test/util/create-object.stub';
import { DaoVuelo } from 'src/dominio/vuelo/puerto/dao/dao-vuelo';
import { ComandoEnlistarVuelo } from 'src/aplicacion/vuelo/comando/enlistar-vuelo.comando';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { VueloEntidad } from 'src/infraestructura/vuelo/entidad/vuelo.entidad';
import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';
import { ManejadorListarVuelo } from 'src/aplicacion/vuelo/consulta/listar-vuelos.manejador';
import { ManejadorListarVueloByUser } from 'src/aplicacion/vuelo/consulta/listar-vuelo-by-user.manejador';

const sinonSandbox = createSandbox();

describe('Pruebas al controlador de usuarios', () => {
	let app: INestApplication;
	let repositorioVuelo: SinonStubbedInstance<RepositorioVuelo>;
	let repositorioUsuario: SinonStubbedInstance<RepositorioUsuario>;
	let daoVuelo: SinonStubbedInstance<DaoVuelo>;

	beforeAll(async () => {
		repositorioVuelo = createStubObj<RepositorioVuelo>([ 'guardar', 'enlistar', 'getVueloById' ]);
		repositorioUsuario = createStubObj<RepositorioUsuario>([
			'actualizarMontoUsuario',
			'existeNombreUsuario',
			'findUsuarioById',
			'findUsuarioByName',
			'guardar'
		]);
		daoVuelo = createStubObj<DaoVuelo>([ 'listar' ], sinonSandbox);

		const moduleRef = await Test.createTestingModule({
			controllers: [ VueloControlador ],
			providers: [
				AppLogger,
				{
					provide: ServicioAgregarVuelo,
					inject: [ RepositorioVuelo ],
					useFactory: servicioAgregarVueloProveedor
				},
				{
					provide: ServicioEnlistarVuelo,
					inject: [ RepositorioVuelo, RepositorioUsuario ],
					useFactory: servicioEnlistarVueloProveedor
				},
				{ provide: RepositorioVuelo, useValue: repositorioVuelo },
				{ provide: DaoVuelo, useValue: daoVuelo },
				{ provide: RepositorioUsuario, useValue: repositorioUsuario },
				ManejadorAgregarVuelo,
				ManejadorEnlistarVuelo,
				ManejadorListarVuelo,
				ManejadorListarVueloByUser
			]
		})
			.overrideGuard(AuthGuard('jwt'))
			.useValue({
				canActivate: (context: ExecutionContext) => {
					const req = context.switchToHttp().getRequest();
					req.user = {
						id: 1,
						nombre: 'lorem ipsum',
						fechaCreacion: new Date(),
						isAdmin: true,
						clave: 'lorem ipsum',
						monto: 100000
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

	it('deberia fallar al registrar un vuelo con un precio mayor a 1000000', async () => {
		const vuelo: ComandoAgregarVuelo = {
			desde: 'bogotá',
			hacia: 'cali',
			fecha: new Date().toISOString(),
			precio: 1500000
		};

		const mensaje = 'El precio del vuelo debe estar entre 0 y 1000000';
		const response = await request(app.getHttpServer()).post('/vuelos').send(vuelo).expect(HttpStatus.BAD_REQUEST);
		expect(response.body.message).toBe(mensaje);
		expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
	});

	it('deberia listar todos los vuelos', async () => {
		const vuelos: any[] = [
			{
				id: 1,
				desde: 'Bogota',
				hacia: 'Medellín',
				precio: 1000000,
				fecha: new Date().toISOString(),
				passengers: []
			}
		];

		daoVuelo.listar.returns(Promise.resolve(vuelos));

		await request(app.getHttpServer()).get('/vuelos').expect(HttpStatus.OK).expect(vuelos);
	});

	it('debería registrar al usuario actual en un vuelo con el id', async () => {
		const vuelo: ComandoEnlistarVuelo = {
			vuelo: 1
		};

		const vueloEntidad = new VueloEntidad();
		vueloEntidad.desde = 'Bogota';
		vueloEntidad.hacia = 'Medellin';
		vueloEntidad.fecha = new Date();
		vueloEntidad.id = 1;
		vueloEntidad.precio = 500000;
		vueloEntidad.passengers = new Array<UsuarioEntidad>();

		repositorioVuelo.getVueloById.returns(Promise.resolve(vueloEntidad));
		const usuarioEntidad = new UsuarioEntidad();
		usuarioEntidad.id = 1;
		usuarioEntidad.nombre = 'lorem ipsum';
		usuarioEntidad.fechaCreacion = new Date();
		usuarioEntidad.isAdmin = false;
		usuarioEntidad.clave = 'lorem ipsum';
		usuarioEntidad.monto = 1000000;

		repositorioUsuario.findUsuarioById.returns(Promise.resolve(usuarioEntidad));

		await request(app.getHttpServer()).post('/vuelos/enlistar').send(vuelo).expect(HttpStatus.CREATED);
	});
});
