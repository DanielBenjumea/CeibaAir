import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuario' })
export class UsuarioEntidad {
	@PrimaryGeneratedColumn() id: number;

	@Column() nombre: string;

	@Column() clave: string;

	@Column({
		default: 0
	}) monto: number;

	@Column() fechaCreacion: Date;

	@Column({
		default: false
	})
	 isAdmin: boolean;
}
