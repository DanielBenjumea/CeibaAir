import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';
import { Usuario } from '../../modelo/usuario';

export abstract class RepositorioUsuario {
	abstract async existeNombreUsuario(nombre: string): Promise<boolean>;
	abstract async guardar(usuario: Usuario);
	abstract async findUsuarioByName(nombre: string): Promise<UsuarioEntidad>;
}
