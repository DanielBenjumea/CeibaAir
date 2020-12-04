import { RepositorioAuth } from 'src/dominio/auth/repositorio/repositorio-auth';
import { RepositorioAuthImpl } from '../adaptador/repositorio-auth-impl';

export const repositorioAuthProvider = {
	provide: RepositorioAuth,
	useClass: RepositorioAuthImpl
};
