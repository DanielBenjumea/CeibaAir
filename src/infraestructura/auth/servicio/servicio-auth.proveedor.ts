import { RepositorioAuth } from 'src/dominio/auth/repositorio/repositorio-auth';
import { ServicioAuth } from 'src/dominio/auth/servicio/servicio-auth';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';

export function servicioAuthProveedor(repositorioUsuario: RepositorioUsuario, repositorioAuth: RepositorioAuth) {
	return new ServicioAuth(repositorioUsuario, repositorioAuth);
}
