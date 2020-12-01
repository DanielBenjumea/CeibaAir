import { Body, Controller, Get, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComandoRegistrarUsuario } from 'src/aplicacion/usuario/comando/registrar-usuario.comando';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/comando/registar-usuario.manejador';
import { ManejadorListarUsuario } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';
import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';
import { ManejadorSignInUsuario } from 'src/aplicacion/usuario/comando/signin-usuario.manejador';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuarios')
export class UsuarioControlador {
	constructor(
		private readonly _manejadorRegistrarUsuario: ManejadorRegistrarUsuario,
		private readonly _manejadorListarUsuario: ManejadorListarUsuario,
		private readonly _manejadorSignInUsuario: ManejadorSignInUsuario
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
}
