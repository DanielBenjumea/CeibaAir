import { Module } from '@nestjs/common';
import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { servicioRegistrarUsuarioProveedor } from './servicio/servicio-registrar-usuario.proveedor';
import { repositorioUsuarioProvider } from './repositorio/repositorio-usuario.proveedor';
import { daoUsuarioProvider } from './dao/dao-usuario.proveedor';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/comando/registar-usuario.manejador';
import { ManejadorListarUsuario } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntidad } from '../entidad/usuario.entidad';
import { ServicioActualizarMontoUsuario } from 'src/dominio/usuario/servicio/servicio-actualizar-monto-usuario';
import { servicioActualizarMontoUsuarioProveedor } from './servicio/servicio-actualizar-monto-usuario.proveedor';
import { ManejadorActualizarMontoUsuario } from 'src/aplicacion/usuario/comando/actualizar-monto-usuario.manejador';

@Module({
	imports: [ TypeOrmModule.forFeature([ UsuarioEntidad ]) ],
	providers: [
		{
			provide: ServicioRegistrarUsuario,
			inject: [ RepositorioUsuario ],
			useFactory: servicioRegistrarUsuarioProveedor
		},
		{
			provide: ServicioActualizarMontoUsuario,
			inject: [ RepositorioUsuario ],
			useFactory: servicioActualizarMontoUsuarioProveedor
		},
		repositorioUsuarioProvider,
		daoUsuarioProvider,
		ManejadorRegistrarUsuario,
		ManejadorListarUsuario,
		ManejadorActualizarMontoUsuario
	],
	exports: [
		ServicioRegistrarUsuario,
		ServicioActualizarMontoUsuario,
		ManejadorRegistrarUsuario,
		ManejadorListarUsuario,
		ManejadorActualizarMontoUsuario,
		RepositorioUsuario,
		DaoUsuario
	]
})
export class UsuarioProveedorModule {}
