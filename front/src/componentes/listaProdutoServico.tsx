/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import ItemGrid from "./itemGrid";
import { Tipo } from "../model/tipo";



type props = {
    tema: string
    tipo: Tipo
    seletorView: Function
}

export default function ListaProdutoServico(props:props) {
    
        let estilo = `collection-item active ${props.tema}`
        let estiloBotao = `btn waves-effect waves-light col right ${props.tema}`
        // let nome = (this.props.tipo === 'Produtos' ? 'Produto ' : 'Serviço ')
        return (
            <div className="collection">
                {/* <a className="collection-item row">
                    {nome} 1
                    <button className={estiloBotao} type="submit" name="action">Associar
                        <i className="material-icons right">device_hub </i>
                    </button>
                </a> */}

                <ItemGrid tema={props.tema} nome=' 1' tipo={props.tipo} id={0} seletorView = {props.seletorView}/>
                <ItemGrid tema={props.tema} nome=' 2' tipo={props.tipo} id={0} seletorView = {props.seletorView}/>
                <ItemGrid tema={props.tema} nome=' 3' tipo={props.tipo} id={0} seletorView = {props.seletorView}/>
                <ItemGrid tema={props.tema} nome=' 4' tipo={props.tipo} id={0} seletorView = {props.seletorView}/>

            </div >
        )
}