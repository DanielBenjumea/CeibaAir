import { Body, Controller, Get, Patch, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComandoRegistrarUsuario } from 'src/aplicacion/usuario/comando/registrar-usuario.comando';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/comando/registar-usuario.manejador';
import { ManejadorActualizarMontoUsuario } from 'src/aplicacion/usuario/comando/actualizar-monto-usuario.manejador';
import { ManejadorListarUsuario } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';
import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuarios')
export class UsuarioControlador {
	constructor(
		private readonly _manejadorRegistrarUsuario: ManejadorRegistrarUsuario,
		private readonly _manejadorListarUsuario: ManejadorListarUsuario,
		private readonly _manejadorActualizarMontoUsuario: ManejadorActualizarMontoUsuario
	) {}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async crear(@Body() comandoRegistrarUsuario: ComandoRegistrarUsuario) {
		await this._manejadorRegistrarUsuario.ejecutar(comandoRegistrarUsuario);
	}

	@Get()
	async listar(): Promise<UsuarioDto[]> {
		return this._manejadorListarUsuario.ejecutar();
	}

	@Patch('actualizar-monto')
	@UseGuards(AuthGuard('jwt'))
	@UsePipes(new ValidationPipe({ transform: true }))
	async actualizarMonto(@Body('monto') monto: number, @Request() req) {
		await this._manejadorActualizarMontoUsuario.ejecutar(req.user.id, monto);
	}
}
