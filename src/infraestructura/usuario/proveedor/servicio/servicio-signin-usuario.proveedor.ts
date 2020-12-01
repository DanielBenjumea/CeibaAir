import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { ServicioSignInUsuario } from 'src/dominio/usuario/servicio/servicio-signin-usuario';

export function servicioSignInUsuarioProveedor(repositiorioUsuario: RepositorioUsuario) {
	return new ServicioSignInUsuario(repositiorioUsuario);
}
