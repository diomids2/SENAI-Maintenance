
import Header from "../../Components/Header/header";
import '../../App.css'
import { useState, useEffect } from "react";
import axios from "axios";
import Trash from '../../assets/trash.png'


 export default function Adm(){
     const[listaAlunos, setListaAlunos] = useState([])
     const[listaColaboradores, setListaColaboradores] = useState([])
     const[idAlterado, setIdAlterado] = useState(0)

    /*
    PARA LISTAR A QUANTIDADE DE ALUNOS E COLABORADORES É NECESSÁRIO COLOCAR O .LENGTH
    PARA CONTAR A QUANTIDADE DE OBJETOS QUE VEM CARREGADO COM O ARRAY
    */

    function ocultarAdm(value){
        return value.tipoUsuario >= "1"
    }

    var adm = listaColaboradores.filter(ocultarAdm)

    function buscarAlunos(){
        axios.get("http://localhost:5000/api/aluno", {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then(resposta => {
            if(resposta.status === 200){
                setListaAlunos(resposta.data)
            }
        })

        .catch(erro => console.log(erro))
    }

    function buscarColaboradores(){
        axios.get("http://localhost:5000/api/usuario", {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then(resposta => {
            if(resposta.status === 200){
                setListaColaboradores(resposta.data)
            }
        })

        .catch(error => console.log(error))
    }

    function deleteList(colaboradores){
        console.log('O desejo ' + colaboradores.idUsuario + 'foi selecionado')

        axios.delete("http://localhost:5000/api/usuario/" + colaboradores.idUsuario, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then(resposta => {
            if(resposta.status === 202){
                console.log('Usuário deletado com sucesso!')
                buscarColaboradores()
            }
        })

        .catch((erro) => console.log(erro))
    }

useEffect(buscarAlunos, [])
useEffect(buscarColaboradores, [])
    return(
            <body className="body-adm">
                <Header />
                <div className="container">
                <header>
                    <input type="search" placeholder="Pesquisar" className="g" />
                </header>
                <div className="sec-display">
                    <a href="">{listaAlunos.length}  alunos</a>
                    <a href="">{listaColaboradores.length - 1} colaboradores</a>
                </div>
                <div className="sec-input-3">
                    <a href="/cadastraraluno" className="p">+ Alunos</a>
                    <a href="/cadastrarcolaborador" className="p">+ Colaboradores</a>
                    <a href="/cadastrarturma" className="p">+ Turmas</a>
                </div>
            <h2>Últimos Colaboradores</h2>
            <section className="lista20">
                {
                    adm.map((colaboradores) => {
                        return(
                                    <div name={idAlterado}  key={colaboradores.idUsuario} value={colaboradores.idUsuario} className="lista">
                                        <div class="linha1">
                                            <p>Nome: {colaboradores.nome} </p>
                                            <p>E-mail: {colaboradores.email} </p>
                                        </div>
                                        <div className="linha2">
                                            <p>Matrícula: {colaboradores.matricula} </p>
                                            <p>Tipo de usuário: {colaboradores.tipoUsuario} </p>
                                        </div>

                                        
                                        <div className="direita">
                                            <div className="status">
                                                
                                            </div>
                                            <div  className="excluir">
                                                <img  onClick={() => deleteList(colaboradores)} src={Trash} />
                                        </div>                
                                        </div>
                                    </div>                                 
                                
                    
                            
                        )
                    })
                }
                 </section>
                 </div>
            </body>
    )
 }