import { VueloEntidad } from 'src/infraestructura/vuelo/entidad/vuelo.entidad';

export abstract class DaoVuelo {
	abstract async listar(): Promise<VueloEntidad[]>;
	abstract async listarByUser(user: number): Promise<VueloEntidad[]>;
}
