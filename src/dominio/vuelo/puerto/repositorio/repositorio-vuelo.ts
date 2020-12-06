import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';
import { VueloEntidad } from 'src/infraestructura/vuelo/entidad/vuelo.entidad';
import { Vuelo } from '../../modelo/Vuelo';

export abstract class RepositorioVuelo {
	abstract async guardar(vuelo: Vuelo);
	abstract async enlistar(vuelo: VueloEntidad, usuario: UsuarioEntidad);
	abstract async getVueloById(vuelo: number)
}
