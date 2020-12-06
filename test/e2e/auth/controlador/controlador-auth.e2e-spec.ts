import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { ManejadorAuth } from 'src/aplicacion/auth/auth-manejador';
import { RepositorioAuth } from 'src/dominio/auth/repositorio/repositorio-auth';
import { ServicioAuth } from 'src/dominio/auth/servicio/servicio-auth';
import { JwtStrategy } from 'src/dominio/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/dominio/auth/strategies/local.strategy';
import { jwtConstants } from 'src/infraestructura/auth/constants/constants';
import { AuthController } from 'src/infraestructura/auth/controller/auth.controller';
import { servicioAuthProveedor } from 'src/infraestructura/auth/servicio/servicio-auth.proveedor';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { createStubObj } from 'test/util/create-object.stub';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';

const sinonSandbox = createSandbox();

describe('Pruebas al controlador de auth', () => {
	let app: INestApplication;
	let repositorioAuth: SinonStubbedInstance<RepositorioAuth>;
	let repositorioUsuario: SinonStubbedInstance<RepositorioUsuario>;

	let daoUsuario: SinonStubbedInstance<DaoUsuario>;

	beforeAll(async () => {
		repositorioAuth = createStubObj<RepositorioAuth>([ 'signToken' ], sinonSandbox);
		repositorioUsuario = createStubObj<RepositorioUsuario>(
			[ 'existeNombreUsuario', 'guardar', 'findUsuarioByName', 'actualizarMontoUsuario', 'findUsuarioById' ],
			sinonSandbox
		);

		daoUsuario = createStubObj<DaoUsuario>([ 'listar' ], sinonSandbox);

		const moduleRef = await Test.createTestingModule({
			imports: [
				PassportModule,
				JwtModule.register({
					secret: jwtConstants.secret,
					signOptions: { expiresIn: '3600s' }
				})
			],
			controllers: [ AuthController ],
			providers: [
				AppLogger,
				{
					provide: ServicioAuth,
					inject: [ RepositorioAuth ],
					useFactory: servicioAuthProveedor
				},
				{ provide: RepositorioUsuario, useValue: repositorioUsuario },
				{ provide: RepositorioAuth, useValue: repositorioAuth },
				{ provide: DaoUsuario, useValue: daoUsuario },
				ServicioAuth,
				LocalStrategy,
				JwtStrategy,
				ManejadorAuth
			]
		}).compile();

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

	it('debería pasar si el usuario y contraseña son exactos', async () => {
		const usuario: UsuarioEntidad = new UsuarioEntidad();
		usuario.nombre = 'LoremIpsum';
		usuario.clave = '123456';
		repositorioUsuario.findUsuarioByName.returns(Promise.resolve(usuario));
		repositorioAuth.signToken.returns(Promise.resolve({ token: 'abce' }));

		const response = await request(app.getHttpServer())
			.post('/auth/login')
			.send({
				username: 'LoremIpsum',
				password: '123456'
			})
			.expect(HttpStatus.CREATED);
		expect(response.body).toHaveProperty('token');
	});

	it('debería fallar si el usuario la contraseña es diferente', async () => {
		const usuario: UsuarioEntidad = new UsuarioEntidad();
		usuario.nombre = 'LoremIpsum';
		usuario.clave = '123456';
		repositorioUsuario.findUsuarioByName.returns(Promise.resolve(usuario));

		const response = await request(app.getHttpServer())
			.post('/auth/login')
			.send({
				username: 'LoremIpsum',
				password: '12345'
			})
			.expect(HttpStatus.UNAUTHORIZED);

		expect(response.body.error).toBe('Unauthorized');
	});
});
