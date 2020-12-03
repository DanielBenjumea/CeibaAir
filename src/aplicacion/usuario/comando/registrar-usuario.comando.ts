import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarUsuario {
	@IsString()
	@ApiProperty({ example: 'William' })
	public nombre: string;

	@IsString()
	@MinLength(4, {
		message: 'Longitud de clave inválida'
	})
	@ApiProperty({ minLength: 4, example: '1234' })
	public clave: string;

	@IsDateString()
	@ApiProperty({ type: Date })
	public fechaCreacion: string;

	@IsOptional()
	@IsNumber()
	public monto?: number;

	@IsOptional()
	@IsBoolean()
	public isAdmin?: boolean;
}
