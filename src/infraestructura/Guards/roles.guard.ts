import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor() {}

	canActivate(context: ExecutionContext): boolean {

		const request = context.switchToHttp().getRequest();
        const user = request.user;
		const isAdmin = () => user.isAdmin;

		return user && isAdmin();
	}
}
