import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { ServicioActualizarMontoUsuario } from 'src/dominio/usuario/servicio/servicio-actualizar-monto-usuario';

export function servicioActualizarMontoUsuarioProveedor(repositorioUsuario: RepositorioUsuario) {
	return new ServicioActualizarMontoUsuario(repositorioUsuario);
}
