import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'vuelo' })
export class VueloEntidad {
	@PrimaryGeneratedColumn() id: number;

	@Column() desde: string;

	@Column() hacia: string;

	@Column() precio: number;

	@Column() fecha: Date;

	@ManyToMany(() => UsuarioEntidad)
	@JoinTable()
	passengers: UsuarioEntidad[];
}
