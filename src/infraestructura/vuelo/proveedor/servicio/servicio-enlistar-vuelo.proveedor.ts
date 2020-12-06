import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { RepositorioVuelo } from 'src/dominio/vuelo/puerto/repositorio/repositorio-vuelo';
import { ServicioEnlistarVuelo } from 'src/dominio/vuelo/servicio/servicio-enlistar.vuelo';

export function servicioEnlistarVueloProveedor(
	repositorioVuelo: RepositorioVuelo,
	repositorioUsuario: RepositorioUsuario
) {
	return new ServicioEnlistarVuelo(repositorioVuelo, repositorioUsuario);
}
