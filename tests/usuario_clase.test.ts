import Usuario from '../src/models/Usuario';
jest.mock('../src/models/Usuario');

 

describe("Usuario test suite", ()=>{ 
    it("Agregar y remover clientes",()=>{
        const usuario = new Usuario("Usuario 1", "password",[]);
        expect(usuario.agregarCliente("cliente1")).toBe(true); 
    });


    it("Debe filtrar clientes por fecha",()=>{

    })
})