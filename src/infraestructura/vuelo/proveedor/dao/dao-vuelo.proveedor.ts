import { DaoVuelo } from 'src/dominio/vuelo/puerto/dao/dao-vuelo';
import { DaoVueloMysql } from '../../adaptador/dao/dao-vuelo-mysql';

export const daoVueloProvider = {
	provide: DaoVuelo,
	useClass: DaoVueloMysql
};
