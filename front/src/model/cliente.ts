import Endereco from "./endereco"

export default class Cliente {
    public id!:number
    public nome: string
    public sobreNome: string
    public email!:string
    public endereco!: Endereco 
    constructor(nome: string, sobreNome: string) {
        this.nome = nome
        this.sobreNome = sobreNome
    }
}