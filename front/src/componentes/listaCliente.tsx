/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import ItemGrid from "./itemGrid";
import { Tipo } from "../model/tipo";
import { useEffect, useState } from "react";
import Cliente from "../model/cliente";

type props = {
    tema: string
    seletorView: Function
}

export default function ListaCliente(props: props) {
    const [clientes, setClientes] = useState<Cliente[]>([])

    const getClientes = async () => {
        try {
            const response = await fetch(`http://localhost:32832/clientes`);
            const jsonData = await response.json();
            setClientes(jsonData)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getClientes()
    }, [])
    let estilo = `collection-item active ${props.tema}`
    return (
        <div className="collection">
            {clientes.map((clienteItem: any) => {
                return (
                    <ItemGrid tema={props.tema} nome={clienteItem.nome} tipo={Tipo.Clientes} id={clienteItem.id} seletorView={props.seletorView} />
                )
            })}
            {/* <ItemGrid tema={props.tema} nome=' 1' tipo={Tipo.Clientes} id='' seletorView = {props.seletorView}/>
                <ItemGrid tema={props.tema} nome=' 2' tipo={Tipo.Clientes} id='' seletorView = {props.seletorView}/>
                <ItemGrid tema={props.tema} nome=' 3' tipo={Tipo.Clientes} id='' seletorView = {props.seletorView}/>
                <ItemGrid tema={props.tema} nome=' 4' tipo={Tipo.Clientes} id='' seletorView = {props.seletorView}/> */}
        </div>
    )
}