import { Usuario } from 'src/dominio/usuario/modelo/usuario';

export abstract class RepositorioAuth {
	abstract async signToken(usuario: Usuario);
}
