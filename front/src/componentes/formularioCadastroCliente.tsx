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
                {/* <div className="row">
                    <div className="input-field col s6">
                        <input defaultValue={cliente.endereco.estado} onChange={handleChange} id="endereco_estado" type="text" className="validate" name='estado' />
                        <label htmlFor="endereco_estado">estado</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue={cliente.endereco.cidade} onChange={handleChange} id="endereco_cidade" type="text" className="validate" name='cidade' />
                        <label htmlFor="endereco_cidade">cidade</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue={cliente.endereco.bairro} onChange={handleChange} id="endereco_bairro" type="text" className="validate" name='bairro' />
                        <label htmlFor="endereco_bairro">bairro</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue={cliente.endereco.rua} onChange={handleChange} id="endereco_rua" type="text" className="validate" name='rua' />
                        <label htmlFor="endereco_rua">rua</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue={cliente.endereco.numero} onChange={handleChange} id="endereco_numero" type="text" className="validate" name='numero' />
                        <label htmlFor="endereco_numero">numero</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue={cliente.endereco.codigoPostal} onChange={handleChange} id="endereco_codigo_postal" type="text" className="validate" name='codigoPostal' />
                        <label htmlFor="endereco_codigo_postal">codigo postal</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue={cliente.endereco.informacoesAdicionais} onChange={handleChange} id="endereco_info" type="text" className="validate" name='InfoAdicional' />
                        <label htmlFor="endereco_info">informacoes adicionais</label>
                    </div>
                </div>  */}

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