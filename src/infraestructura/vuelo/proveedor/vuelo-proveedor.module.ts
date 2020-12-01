import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManejadorAgregarVuelo } from 'src/aplicacion/vuelo/comando/agregar-vuelo.manejador';
import { ManejadorEnlistarVuelo } from 'src/aplicacion/vuelo/comando/enlistar-vuelo.manejador';
import { RepositorioVuelo } from 'src/dominio/vuelo/puerto/repositorio/repositorio-vuelo';
import { ServicioAgregarVuelo } from 'src/dominio/vuelo/servicio/servicio-agregar-vuelo';
import { ServicioEnlistarVuelo } from 'src/dominio/vuelo/servicio/servicio-enlistar.vuelo';
import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';
import { VueloEntidad } from '../entidad/vuelo.entidad';
import { daoVueloProvider } from './dao/dao-vuelo.proveedor';
import { repositorioVueloProvider } from './repositorio/repositorio-vuelo.proveedor';
import { servicioAgregarVueloProveedor } from './servicio/servicio-agregar-vuelo.proveedor';
import { servicioEnlistarVueloProveedor } from './servicio/servicio-enlistar-vuelo.proveedor';

@Module({
	imports: [ TypeOrmModule.forFeature([ VueloEntidad, UsuarioEntidad ]) ],
	providers: [
		{
			provide: ServicioAgregarVuelo,
			inject: [ RepositorioVuelo ],
			useFactory: servicioAgregarVueloProveedor
		},
		{
			provide: ServicioEnlistarVuelo,
			inject: [ RepositorioVuelo ],
			useFactory: servicioEnlistarVueloProveedor
		},
		repositorioVueloProvider,
		daoVueloProvider,
		ManejadorAgregarVuelo,
		ManejadorEnlistarVuelo
	],
	exports: [ ServicioAgregarVuelo, ManejadorAgregarVuelo, ManejadorEnlistarVuelo ]
})
export class VueloProveedorModule {}
