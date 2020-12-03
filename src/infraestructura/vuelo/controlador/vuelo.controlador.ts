import { Body, Controller, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ComandoAgregarVuelo } from 'src/aplicacion/vuelo/comando/agregar-vuelo.comando';
import { ManejadorAgregarVuelo } from 'src/aplicacion/vuelo/comando/agregar-vuelo.manejador';
import { ComandoEnlistarVuelo } from 'src/aplicacion/vuelo/comando/enlistar-vuelo.comando';
import { ManejadorEnlistarVuelo } from 'src/aplicacion/vuelo/comando/enlistar-vuelo.manejador';
import { RolesGuard } from 'src/infraestructura/Guards/roles.guard';

@Controller('vuelos')
export class VueloControlador {
	constructor(
		private readonly _manejadorAgregarVuelo: ManejadorAgregarVuelo,
		private readonly _manejadorEnlistarVuelo: ManejadorEnlistarVuelo
	) {}

	@Post()
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@UsePipes(new ValidationPipe({ transform: true }))
	async crear(@Body() comandoAgregarVuelo: ComandoAgregarVuelo) {
		await this._manejadorAgregarVuelo.ejecutar(comandoAgregarVuelo);
	}

	@Post('enlistar')
	@UseGuards(AuthGuard('jwt'))
	async enlistar(@Body() comandoEnlistarVuelo: ComandoEnlistarVuelo, @Request() req) {
		this._manejadorEnlistarVuelo.ejecutar(comandoEnlistarVuelo.vuelo, req.user.userId);
	}
}
