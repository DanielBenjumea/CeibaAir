import { Vuelo } from '../../modelo/Vuelo';

export abstract class RepositorioVuelo {
	abstract async guardar(vuelo: Vuelo);
	abstract async enlistar(vuelo: number, usuario: number);
}
