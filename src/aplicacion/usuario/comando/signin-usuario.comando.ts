import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ComandoSignInUsuario {
	@IsString()
	@ApiProperty({ example: 'Daniel' })
	public nombre: string;

	@IsString()
	@ApiProperty({ minLength: 4, example: '1234' })
	public clave: string;
}
