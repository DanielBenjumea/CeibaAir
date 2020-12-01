import { number } from '@hapi/joi';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class ComandoAgregarVuelo {
	@IsString()
	@ApiProperty({ example: 'Bogota' })
	public desde: string;

	@IsString()
	@ApiProperty({ example: 'Medellín' })
	public hacia: string;

	@IsNumber()
	@ApiProperty({ type: number })
	public precio: number;

	@IsDateString()
	@ApiProperty({ type: Date })
	public fecha: string;
}
