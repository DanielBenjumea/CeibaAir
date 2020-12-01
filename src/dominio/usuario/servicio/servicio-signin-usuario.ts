import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';
import { RepositorioUsuario } from '../puerto/repositorio/repositorio-usuario';

export class ServicioSignInUsuario {
	constructor(private readonly _repositorioUsuario: RepositorioUsuario) {}

	async ejecutar(nombre: string) {
		const usuario: UsuarioEntidad = await this._repositorioUsuario.findUsuarioByName(nombre);
		if (!usuario) {
			throw new ErrorDeNegocio('Nombre de usuario o contraseña incorrecto');
		}
		return usuario;
	}
}
