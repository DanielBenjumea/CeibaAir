import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vuelo } from 'src/dominio/vuelo/modelo/Vuelo';
import { RepositorioVuelo } from 'src/dominio/vuelo/puerto/repositorio/repositorio-vuelo';
import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';
import { Repository } from 'typeorm';
import { VueloEntidad } from '../../entidad/vuelo.entidad';

@Injectable()
export class RepositorioVueloMysql implements RepositorioVuelo {
	constructor(
		@InjectRepository(VueloEntidad) private readonly vueloRepositorio: Repository<VueloEntidad>,
		@InjectRepository(UsuarioEntidad) private readonly usuarioRepositorio: Repository<UsuarioEntidad>
	) {}

	async guardar(vuelo: Vuelo) {
		const entidad = new VueloEntidad();
		entidad.desde = vuelo.desde;
		entidad.hacia = vuelo.hacia;
		entidad.precio = vuelo.precio;
		entidad.fecha = vuelo.fecha;
		await this.vueloRepositorio.save(entidad);
	}

	async enlistar(vuelo: number, usuario: number) {
		const vueloEntidad: VueloEntidad = await this.vueloRepositorio.findOne(vuelo, {
			relations: [ 'passengers' ]
		});
		const usuarioExists = vueloEntidad.passengers.find(user => user.id === usuario);
		if(!usuarioExists) {
			const usuarioEntidad: UsuarioEntidad = await this.usuarioRepositorio.findOne(usuario);
			vueloEntidad.passengers.push(usuarioEntidad)
		}
		await this.vueloRepositorio.save(vueloEntidad);
	}
}
