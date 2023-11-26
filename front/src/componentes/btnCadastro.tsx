import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import { Tipo } from "../model/tipo";

type props = {
    tema: string
    tipo: Tipo
    seletorView: Function
}

export default function BtnCadastro(props: props) {

    let btnEstilo = `btn-floating btn-large waves-effect waves-light right ${props.tema}`
    let tela: string = Tipo[props.tipo]
    return (
        <>
            <a className={btnEstilo} onClick={(e: any) => props.seletorView(0,'Cadastros' + tela, e)}>
                <i className="material-icons">add</i>
            </a>
        </>
    )
}