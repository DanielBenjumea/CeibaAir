import { Module } from '@nestjs/common';
import { VueloControlador } from './controlador/vuelo.controlador';
import { VueloProveedorModule } from './proveedor/vuelo-proveedor.module';

@Module({
	imports: [ VueloProveedorModule ],
	controllers: [ VueloControlador ]
})
export class VueloModule {}
