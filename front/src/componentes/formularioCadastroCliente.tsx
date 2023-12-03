import { Component } from "react";
import { useEffect, useState } from "react";
import Cliente from "../model/cliente";

type props = {
    tema: string
    seletorView: Function
    id: number
}

export default function FormularioCadastroCliente(props: props) {

    const [cliente, setCliente] = useState(new Cliente('', ''))

    const getCliente = async () => {
        if (props.id !== 0) {
            try {
                const response = await fetch(`http://localhost:32832/cliente/${props.id}`);
                const jsonData = await response.json();
                setCliente(jsonData)
            } catch (error: any) {
                console.log(error.message)
            }
        }
    }

    useEffect(() => {
        getCliente()
    }, [])

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setCliente(prevCliente => ({
            ...prevCliente,
            [name]: value
        }));
    };

    const deletar = async(e:any) => {
        try {
            const response = await fetch(`http://localhost:32832/cliente/excluir`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cliente),
              });
        } catch (error:any) {
            console.log(error.message)
        }
        props.seletorView(0,'Clientes', e) 
    }

    const inserir = async () => {
        try {
            const response = await fetch(`http://localhost:32832/cliente/cadastrar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cliente),
            });
            if (response.ok) {
                console.log("Cliente criado com sucesso!");
            } else {
                throw new Error("Erro ao inserir cliente");
            }
            
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const atualizar = async () => {
        try {
            const response = await fetch(`http://localhost:32832/cliente/atualizar`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cliente),
            });
            if (response.ok) {
                console.log("Cliente criado com sucesso!");
            } else {
                throw new Error("Erro ao inserir cliente");
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const salvar = (e:any) => {
        if (props.id !== 0) {
            atualizar()
        }
        else {
            inserir()
        }
       props.seletorView(0,'Clientes', e)   
    }

    let estiloBotao = `btn waves-effect waves-light col left ${props.tema}`
    return (
        <div className="row">
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <input defaultValue={cliente.nome} onChange={handleChange} id="first_name" type="text" className="validate" name='nome' />
                        <label htmlFor="first_name">Nome</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue={cliente.sobreNome} onChange={handleChange} id="last_name" type="text" className="validate" name='sobreNome' />
                        <label htmlFor="last_name">Sobrenome</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="telefone" type="text" className="validate" />
                        <label htmlFor="telefone">Telefone</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue={cliente.email} onChange={handleChange} id="email" type="email" className="validate" name='email' />
                        <label htmlFor="email">E-mail</label>
                    </div>
                </div>

            </form>
            <div className="">
                <div className="row">
                    <button className={estiloBotao} onClick={ (e) => salvar(e)}>Salvar
                        <i className="material-icons right">send</i>
                    </button>

                    <a className="col s1 left"> </a>

                    <button className={estiloBotao} onClick={ (e) => deletar(e)}>Deletar
                        <i className="material-icons right">clear</i>
                    </button>
                </div>
            </div>
        </div>
    )
}