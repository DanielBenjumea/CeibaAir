import { Vuelo } from '../modelo/Vuelo';
import { RepositorioVuelo } from '../puerto/repositorio/repositorio-vuelo';

export class ServicioAgregarVuelo {
	constructor(private readonly _repositorioVuelo: RepositorioVuelo) {}

	async ejecutar(vuelo: Vuelo) {
		await this._repositorioVuelo.guardar(vuelo);
	}
}
