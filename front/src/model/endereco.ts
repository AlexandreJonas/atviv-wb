export default class Endereco {
    public estado:string
    public cidade: string
    public bairro!: string
    public rua!: string
    public numero!:number
    public codigoPostal!:string
    public informacoesAdicionais!: string

    constructor(cidade: string, estado: string) {
        this.cidade = cidade
        this.estado = estado
    }
}