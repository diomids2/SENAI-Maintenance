
import Header from "../../Components/Header/header";
import axios from "axios";
import { useState } from "react";

export default function CadastrarColaborador(){
    const[nome, setNome] = useState('')
    const[matricula, setMatricula] = useState('')
    const[email, setEmail]= useState('')
    const[senha, setSenha] = useState('')
    const[tipoUsuario, setTipoUsuario] = useState('')
    const[statusUsuario, setStatusUsuario] = useState('')
    const[mensageSucess, setMensageSucess] = useState('')

    function cadastrar(event){
        event.preventDefault();

        axios.post("http://localhost:5000/api/usuario", {
            nome : nome,
            matricula : matricula,
            email : email,
            senha : senha,
            tipoUsuario : tipoUsuario,
            statusUsuario : statusUsuario
        }, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then(resposta => {
            if(resposta.status === 201){
               setMensageSucess('Usuário cadastrado com sucesso!');
                console.log('Usuário cadastrado com sucesso!')
            }
        })

        .catch((erro) => console.log(erro))
    }

    return(
        <body className="body-aluno">
        <Header />
     <div className="container">
     <h2>Cadastrar Colaborador(a)</h2>

             <form onSubmit={cadastrar}>

             <div className="sec-input-3">
                 <input className="m" value={nome} name="nome" onChange={(event) => setNome(event.target.value)} placeholder="Nome Completo" type="text"/>
                 <input className="p" value={matricula} name="matricula"  onChange={(event) => setMatricula(event.target.value)} placeholder="Matrícula " type="text"/>
             </div>

             <div className="sec-input-2">
                 <input className="m" value={email} name="email"  onChange={(event) => setEmail(event.target.value)} placeholder="Email" type="email"/>
                 <input className="p" value={senha} name="senha"   onChange={(event) => setSenha(event.target.value)} placeholder="Senha" type="password"/>
             </div>   

             <div className="sec-input-2">
                 <select className="m" value={tipoUsuario} name="tipoUsuario"  onChange={(event) => setTipoUsuario(event.target.value)} id="">
                     <option Disabled value="3">----Selecione o tipo de usuário----</option>
                     <option value="0">Administrador</option>
                     <option value="1">Colaborador</option>
                 </select>
                 <select  className="p" value={statusUsuario} onChange={(event) => setStatusUsuario(event.target.value)} name="statusUsuario" id="">
                     <option Disabled value="">Status</option>
                     <option value="0">Ativo</option>
                     <option value="1">Inativo</option>
                 </select>
             </div>    
                    <div className="sec-input-3">
                    <p className="msgSucess">{mensageSucess}</p>
                    </div>
               
                 <button type="submit">Cadastrar</button>
             </form>
     </div>           
     </body>
    )
}