import { RepositorioVuelo } from '../puerto/repositorio/repositorio-vuelo';

export class ServicioEnlistarVuelo {
	constructor(private readonly _repositorioVuelo: RepositorioVuelo) {}

	async ejecutar(vuelo: number, usuario: number) {
		await this._repositorioVuelo.enlistar(vuelo, usuario);
	}
}
