import { Component, useEffect } from "react";
import Logo from '../../assets/logo.png'
import App from '../../App'
import Header from "../../Components/Header/header";
import { useState } from "react/cjs/react.development";
import { parseJwt } from "../../services/auth";
import axios from "axios";

export default function Perfil(){
    const[nome, setNome] = useState('')
    const[email, setEmail] = useState('')
    const[tipoUsuario, setTipoUsuario] = useState('')
    const[matricula, setMatricula] = useState('')
    const[listaUser, setListaUser] = useState([])


    function buscarUserPorId(){
       axios.get("http://localhost:5000/api/usuario",{
           headers : {
               'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
           }
       })
       
       .then(resposta => {
           if(resposta.status === 201){
               setListaUser(resposta.data)
           }
       })

       .catch((erro) => console.log(erro))
    }
    
    {/*
        PERFIL PODE SER FEITO COM FILTER DE INFORMAÇÕES DO MÉTODO GET 
    
    */}

    useEffect(buscarUserPorId, [])

    return(
        <body className="body-aluno">
        <Header />
     <div className="container">
     <h2>Perfil</h2>

            {
                listaUser.map((user) => {
                    return(
                        <form value={user.idUsuario} action="">

                            <div className="sec-input-3">
                                <input disabled value={user.nome} className="m" placeholder="Nome Completo" type="text"/>
                                <input  disabled  value={user.matricula} className="p" placeholder="Matrícula " type="text"/>
                            </div>

                            <div className="sec-input-2">
                                <input disabled value={user.email} className="m" placeholder="Email" type="email"/>
                            </div>   

                            <div className="sec-input-2">
                                <select  disabled className="m" name="tipoUser" id="">
                                    <option Disabled value="0">{user.tipoUsuario}</option>
                                </select>
                                <select disabled className="p" name="status" id="">
                                    <option Disabled value="0">{user.statusUsuario}</option>
                                </select>
                            </div>    
                 
                        </form>
                    )
                })
            }
             
     </div>           
     </body>
    )
}
