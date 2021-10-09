import Header from "../../Components/Header/header";
import axios from "axios";
import { Component } from "react";
import '../../App.css';
import { useState } from "react/cjs/react.development";

export default function CadastrarTurma(){
    const[titulo, setTitulo] = useState('')
    const[nrSala, setNrSala] = useState('')
    const[mensageSucess, setMensageSucess] = useState('')


    function cadastrar(event){
        event.preventDefault();

        axios.post("http://localhost:5000/api/sala", {
            titulo : titulo,
            numero : nrSala
            
        }, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then(resposta => {
            if(resposta.status === 201){
                setMensageSucess('Turma cadastrada com sucesso!')
            }
        })

        .catch((erro) => console.log(erro))
    }
    return(
        <body className="body-aluno">
        <Header />
        <div className="container">
            <div className="cadastraTurma">
                <h2>Cadastrar Turma</h2>
                <form  onSubmit={cadastrar} className="cTurma" >
                    <input className="p" value={titulo} onChange={(event) => setTitulo(event.target.value)} name="titulo" placeholder="Título" type="text" />
                    <input className="p" value={nrSala} onChange={(event) => setNrSala(event.target.value)} name="nrSala" placeholder="Número Sala" type="text"/>
                    <p className="msgSucess">{mensageSucess}</p>
                    <button className="btTurma" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>    
</body>
    )
}
