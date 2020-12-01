import { RepositorioVuelo } from "src/dominio/vuelo/puerto/repositorio/repositorio-vuelo";
import { ServicioEnlistarVuelo } from "src/dominio/vuelo/servicio/servicio-enlistar.vuelo";

export function servicioEnlistarVueloProveedor(repositorioVuelo: RepositorioVuelo) {
	return new ServicioEnlistarVuelo(repositorioVuelo);
}