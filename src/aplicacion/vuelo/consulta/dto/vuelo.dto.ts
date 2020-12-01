import { number } from '@hapi/joi';
import { ApiProperty } from '@nestjs/swagger';

export class VueloDto {
	@ApiProperty({ example: 'Bogota' })
	desde: string;

	@ApiProperty({ example: 'Bogota' })
	hacia: string;

	@ApiProperty({ type: number })
	precio: number;

	@ApiProperty({ type: Date })
	fecha: Date;
}
