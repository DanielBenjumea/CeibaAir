import { RepositorioVuelo } from 'src/dominio/vuelo/puerto/repositorio/repositorio-vuelo';
import { RepositorioVueloMysql } from '../../adaptador/repositorio/repositorio-vuelo-mysql';

export const repositorioVueloProvider = {
	provide: RepositorioVuelo,
	useClass: RepositorioVueloMysql
};
