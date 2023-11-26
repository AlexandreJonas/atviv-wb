import { Component, useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import FormularioCadastroProdutoServico from "./formularioCadastroProdutoServico";
import ListaCliente from "./listaCliente";
import ListaProdutoServico from "./listaProdutoServico";
import BtnCadastro from "./btnCadastro";
import { Tipo } from "../model/tipo";


type state = {
    tela: string
    id:number
}

export const Roteador = () => {
    let Auxstate:state = {
        tela: 'Clientes',
        id:0
    }

    const [state,setState] = useState(Auxstate)

    const selecionarView = (id:number, novaTela: string, evento: Event) => {
        evento.preventDefault()
        console.log('Roteador: ' + id);
        setState({
            tela: novaTela,
            id: id
        })
    }

    
        let barraNavegacao = <BarraNavegacao seletorView={selecionarView} tema="purple lighten-4" botoes={['Clientes', 'Produtos', 'Serviços']} />
        let estiloBotao = `btn waves-effect waves-light left purple lighten-4`
        let tipoCadastro
        switch (state.tela) {
            case 'Clientes':
                return (
                    <>
                        {barraNavegacao}
                        <ListaCliente tema="purple lighten-4" seletorView={selecionarView} />
                        <BtnCadastro tema="purple lighten-4" tipo={Tipo[state.tela]} seletorView={selecionarView} />
                    </>
                )

            case 'Produtos':
            case 'Serviços':
                return (
                    <>
                        {barraNavegacao}
                        <ListaProdutoServico tema="purple lighten-4" tipo={Tipo[state.tela]} seletorView={selecionarView} />
                        <BtnCadastro tema="purple lighten-4" tipo={Tipo[state.tela]} seletorView={selecionarView} />
                    </>
                )

            case 'CadastrosClientes':
                return (
                    <>
                        {barraNavegacao}
                        <FormularioCadastroCliente tema="purple lighten-4" seletorView={selecionarView} id= {state.id}/>
                        <a> Produtos Associados</a>
                        <ListaProdutoServico tema="purple lighten-4" tipo={Tipo.Produtos} seletorView={selecionarView} />
                        <a> Serviços Associados</a>
                        <ListaProdutoServico tema="purple lighten-4" tipo={Tipo.Serviços} seletorView={selecionarView} />
                    </>
                )

            case 'CadastrosProdutos':
            case 'CadastrosServiços':
                tipoCadastro = (state.tela === 'CadastrosProdutos' ? Tipo.Produtos : Tipo.Serviços)
                return (
                    <>
                        {barraNavegacao}
                        <FormularioCadastroProdutoServico tema="purple lighten-4" tipo={tipoCadastro} seletorView={selecionarView} />
                    </>
                )

            case 'Associar':
                return (
                    <>
                        {barraNavegacao}
                        <a className=""> Clientes</a>
                        <ListaCliente tema="purple lighten-4" seletorView={selecionarView} />
                        <a> Produtos</a>
                        <ListaProdutoServico tema="purple lighten-4" tipo={Tipo.Produtos} seletorView={selecionarView} />
                        <a> Serviços</a>
                        <ListaProdutoServico tema="purple lighten-4" tipo={Tipo.Serviços} seletorView={selecionarView} />
                        <button className={estiloBotao} onClick={(e:any) => (selecionarView(0,'CadastrosClientes',e))}>Associar
                            <i className="material-icons right">send </i>
                        </button>
                    </>
                )

            default:
                return (
                    <>
                        {barraNavegacao}
                    </>
                )
        }
}