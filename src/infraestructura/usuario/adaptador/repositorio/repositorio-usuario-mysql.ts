import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntidad } from '../../entidad/usuario.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioUsuarioMysql implements RepositorioUsuario {
	constructor(@InjectRepository(UsuarioEntidad) private readonly repositorio: Repository<UsuarioEntidad>) {}

	async existeNombreUsuario(nombre: string): Promise<boolean> {
		return (await this.repositorio.count({ nombre })) > 0;
	}

	async guardar(usuario: Usuario) {
		const entidad = new UsuarioEntidad();
		entidad.clave = usuario.clave;
		entidad.fechaCreacion = usuario.fechaCreacion;
		entidad.nombre = usuario.nombre;
		entidad.isAdmin = usuario.isAdmin;
		await this.repositorio.save(entidad);
	}

	async findUsuarioByName(nombre: string): Promise<UsuarioEntidad> {
		return await this.repositorio.findOne({ nombre });
	}

	async findUsuarioById(id: number): Promise<UsuarioEntidad> {
		return await this.repositorio.findOne({ id });
	}

	async actualizarMontoUsuario(user: UsuarioEntidad) {
		await this.repositorio.save(user);
	}
}
