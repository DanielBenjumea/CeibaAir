import { SinonStubbedInstance } from 'sinon';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { Vuelo } from 'src/dominio/vuelo/modelo/Vuelo';
import { RepositorioVuelo } from 'src/dominio/vuelo/puerto/repositorio/repositorio-vuelo';
import { ServicioAgregarVuelo } from 'src/dominio/vuelo/servicio/servicio-agregar-vuelo';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioAgregarVuelo', () => {
	let servicioAgregarVuelo: ServicioAgregarVuelo;
	let repositorioVueloStub: SinonStubbedInstance<RepositorioVuelo>;

	beforeEach(() => {
		repositorioVueloStub = createStubObj<RepositorioVuelo>([ 'guardar' ]);
		servicioAgregarVuelo = new ServicioAgregarVuelo(repositorioVueloStub);
	});
	it('debería guardar el vuelo en el repositorio', async () => {
		const vuelo = new Vuelo('Bogotá', 'Cali', 500000, new Date().toISOString(), new Array<Usuario>());

		await servicioAgregarVuelo.ejecutar(vuelo);

		expect(repositorioVueloStub.guardar.getCalls().length).toBe(1);
		expect(repositorioVueloStub.guardar.calledWith(vuelo)).toBeTruthy();
	});
});
