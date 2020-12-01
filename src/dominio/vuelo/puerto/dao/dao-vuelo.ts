import { VueloDto } from '../../../../aplicacion/vuelo/consulta/dto/vuelo.dto';

export abstract class DaoVuelo {
	abstract async listar(): Promise<VueloDto[]>;
}
