import { ServicioAuth } from 'src/dominio/auth/servicio/servicio-auth';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { createStubObj } from 'test/util/create-object.stub';
import { SinonStubbedInstance } from 'sinon';
import { RepositorioAuth } from 'src/dominio/auth/repositorio/repositorio-auth';
import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';

describe('ServicioAuth', () => {
	let servicioAuth: ServicioAuth;
	let repositorioUsuarioStub: SinonStubbedInstance<RepositorioUsuario>;
	let repositorioAuthStub: SinonStubbedInstance<RepositorioAuth>;
	beforeEach(() => {
		repositorioUsuarioStub = createStubObj<RepositorioUsuario>([
			'existeNombreUsuario',
			'findUsuarioByName',
			'guardar'
		]);
		repositorioAuthStub = createStubObj<RepositorioAuth>([ 'signToken' ]);
		servicioAuth = new ServicioAuth(repositorioUsuarioStub, repositorioAuthStub);
	});

	it('debería fallar si el usuario no existe', async () => {
		const usuario: UsuarioEntidad = new UsuarioEntidad();
		usuario.nombre = 'juan';
		usuario.clave = '1234';
		repositorioUsuarioStub.findUsuarioByName.returns(Promise.resolve(usuario));

		await expect(
			await servicioAuth.validateUser('juanito', '3214')
		).toBe(false);
	
	});

	it('debería pasar si el usuario y contraseña existen', async () => {
		const usuario: UsuarioEntidad = new UsuarioEntidad();
		usuario.nombre = 'juan';
		usuario.clave = '1234';
		repositorioUsuarioStub.findUsuarioByName.returns(Promise.resolve(usuario));

		await expect(
			await servicioAuth.validateUser('juan', '1234')
		).toEqual({ nombre: 'juan' });
	
	});
});
