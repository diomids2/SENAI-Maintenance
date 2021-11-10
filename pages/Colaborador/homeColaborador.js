import Header from "../../Components/Header/header";
import '../../App.css'
import { useState, UseEffect } from "react";
import axios from "axios";
import { useEffect } from "react/cjs/react.development";
import Trash from  '../../assets/trash.png'

 export default function Adm(){
     const[listaAlunos, setListaAlunos] = useState([])
     const[listaTurmas, setListaTurmas] = useState([])

    /*
    PARA LISTAR A QUANTIDADE DE ALUNOS E COLABORADORES É NECESSÁRIO COLOCAR O .LENGTH
    PARA CONTAR A QUANTIDADE DE OBJETOS QUE VEM CARREGADO COM O ARRAY
    */

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

    function buscarSalas(){
        axios.get("http://localhost:5000/api/sala", {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then(resposta => {
            if(resposta.status === 200){
                setListaTurmas(resposta.data)
            }
        })

        .catch(error => console.log(error))
    }

    function deleteList(alunos){
        console.log('O desejo ' + alunos.idAluno + 'foi selecionado')

        axios.delete("http://localhost:5000/api/aluno/" + alunos.idAluno, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then(resposta => {
            if(resposta.status === 204){
                console.log('Aluno deletado com sucesso!')
                buscarAlunos()
            }
        })

        .catch((erro) => console.log(erro))
    }

    useEffect(buscarAlunos, [])
    useEffect(buscarSalas, [])
    return(
        <body className="body-aluno">
            <Header />
            <div className="container">
            <header>
                <input type="search" id="search" placeholder="Pesquisar" className="g" />
            </header>
            <div className="sec-display">
                <a href="">{listaAlunos.length} Serviços Pendentes</a>
                <a href="">{listaTurmas.length} Solicitar Suporte</a>
            </div>
        <h2>Serviços Pendentes</h2>
        <section className="lista20">
            {
                listaAlunos.map((alunos) => {
                    return(
                        <div  key={alunos.idAluno} className="lista">
                        <div class="linha1">
                            <p>Nome: {alunos.nomeAluno} </p>
                            <p>Ano: {alunos.anoLetivo}°</p>
                        </div>
                        <div className="linha2">
                            <p>E-mail: {alunos.email}</p>
                            <p>Telefone: {alunos.telefone}</p>
                        </div>
                        <div className="direita">
                            <div className="status">
                                .
                            </div>
                            <div className="excluir">
                                <img onClick={() => deleteList(alunos)} src={Trash} />
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