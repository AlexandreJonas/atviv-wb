import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import { Tipo } from "../model/tipo";


type props = {
    tema: string
    tipo: Tipo
    id: number
    nome: string
    seletorView: Function
}

export default function ItemGrid(props:props){
    
        let estilo = `collection-item active ${props.tema}`
        let estiloBotao = `btn waves-effect waves-light col right ${props.tema}`
        let nome:any = props.tipo
        let tela:string =  Tipo[props.tipo]
        return (
            <a className="collection-item row">
                    {props.nome}
                    {/* <a className="col"> {nome} 1</a> */}
                    <button className={estiloBotao} type="submit" name="action" onClick={(e:any) => props.seletorView(props.id,'Associar', e)}>Associar
                        <i className="material-icons right">device_hub </i>
                    </button>
                    <a className="col s1 right"> </a>
                    <button className={estiloBotao} type="submit" name="action" onClick={(e:any) => props.seletorView(props.id,'Cadastros' + tela, e)}>Editar
                        <i className="material-icons right">create </i>
                    </button>
                </a>
        )
}