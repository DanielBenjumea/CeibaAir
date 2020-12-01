import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ComandoEnlistarVuelo {

	@IsNumber()
	@ApiProperty({ example: 2 })
	public vuelo: number;
}
