import { RepositorioVuelo } from 'src/dominio/vuelo/puerto/repositorio/repositorio-vuelo';
import { ServicioAgregarVuelo } from 'src/dominio/vuelo/servicio/servicio-agregar-vuelo';

export function servicioAgregarVueloProveedor(repositorioVuelo: RepositorioVuelo) {
	return new ServicioAgregarVuelo(repositorioVuelo);
}
