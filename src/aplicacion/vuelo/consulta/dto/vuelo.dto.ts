import { number } from '@hapi/joi';
import { ApiProperty } from '@nestjs/swagger';
import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';

export class VueloDto {
	@ApiProperty({ example: 'Bogota' })
	desde: string;

	@ApiProperty({ example: 'Bogota' })
	hacia: string;

	@ApiProperty({ type: number })
	precio: number;

	@ApiProperty({ type: Date })
	fecha: Date;

	@ApiProperty({ type: Array })
	passengers: Array<UsuarioDto>;
}
