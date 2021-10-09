import { Component, useState, useEffect } from 'react';

import Header from '../../Components/Header/header';

import axios from 'axios';


export default function CadastrarAluno(){
    const[nomeAluno, setNomeAluno] = useState('')
    const[re, setRe] = useState('')
    const[foto, setFoto] = useState('')
    const[dataNascimento, setDataNascimento] = useState('')
    const[telefone, setTelefone] = useState('')
    const[email, setEmail] = useState('')
    const[idSala, setIdSala] = useState('')
    const[anoLetivo, setAnoLetivo] = useState('')
const[statusAluno, setStatusAluno] = useState('')
    const[descricao, setDescricao] = useState('')
    const[endereco, setEndereco] = useState('')
    const[mensageSucess, setMensageSucess] = useState('')
    const[salas, setSalas] = useState([])

    function postAlunos(event){
        event.preventDefault();

        axios.post("http://localhost:5000/api/aluno", {
            idSala : idSala,
            nomeAluno : nomeAluno,
            dataNascimento : dataNascimento,
            endereco : endereco,
            telefone :telefone,
            email : email,
            anoLetivo : anoLetivo,
            re : re,
            statusAluno : statusAluno,
            foto : foto,
            descricao : descricao
        }, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then(resposta => {
            if(resposta.status === 201){
                setMensageSucess('Aluno cadastrado com sucesso')
                console.log('Aluno cadastrado com sucesso!');
            }
        })

        .catch((erro) => console.log(erro))
    }

    function buscarSalas(){
        axios.get('http://localhost:5000/api/sala',{
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then(resposta => {
            if(resposta.status === 200){
                setSalas(resposta.data)
                console.log('Listando Salas')
            }
        })

        .catch((erro) => console.log(erro))
    }

    useEffect(buscarSalas, [])

    return(
        
        <body className="body-aluno">
            
        <Header />
            <div className="container">
            <h2>Cadastrar Aluno(a)</h2>
            <form onSubmit={postAlunos}>
                        <div className="sec-input-1">
                            <div className="sec-superior">
                                <input type="text" className="nome_completo" name="nomeAluno" value={nomeAluno}  onChange={(event) => setNomeAluno(event.target.value)} placeholder="Nome completo" required />
                            </div>
                            
                            <div className="sec-inferior">
                                <input className="m" type="text" onChange={(event) => setRe(event.target.value)} name="re" value={re} placeholder="R.E" required /> 
                            </div>
            
                            <div className="file-input">
                                <input type="file" onChange={(event) => setFoto(event.target.value)} name="foto" value={foto} id="foto" accept=".jpg,.png"  />
                                <label className="label-input" for="foto"><img id="img" /></label>
                                <p>Selecionar imagem</p>
                            </div>
                            
                        </div>
                        <div className="sec-input-3">
                            <input className="m" type="date" onChange={(event) => setDataNascimento(event.target.value)}name="dataNascimento" value={dataNascimento} id="" placeholder="Data de nascimento" required />
                            <input className="pm" type="tel" onChange={(event) => setTelefone(event.target.value)} name="telefone" value={telefone} id="" placeholder="Telefone" required />
                        </div>
                        <div className="sec-input-2">
                            <input className="g" type="email" onChange={(event) => setEmail(event.target.value)} name="email" value={email} id="" placeholder="Email" required />
                        </div>
                        <div className="sec-input-3">
                            <input className="g" type="text"  onChange={(event) => setEndereco(event.target.value)} name="endereco" value={endereco} id="" placeholder="Endereço" required />
                        </div>
                    
                        <div className="sec-input-3">
                            <select className="p" name="idSala" value={idSala} onChange={(event) => setIdSala(event.target.value)} required>
                                <option Disabled value="0">----Selecione a sala----</option>
                                {
                                    salas.map((sala) => {
                                        return(
                                            <option value={sala.idSala} onChange={(event) => setIdSala(event.target.value)}  key={sala.idSala}>{sala.titulo}</option>
                                        )
                                    })
                                }
                            </select>
                            <input className="p" type="ano" onChange={(event) => setAnoLetivo(event.target.value)} name="anoLetivo" value={anoLetivo} id="" placeholder="Ano Letivo" required />
                            <select className="p" name="statusAluno" value={statusAluno} onChange={(event) => setStatusAluno(event.target.value)} required>
                                <option Disabled value="3">----Selecione o status do Aluno----</option>
                                <option value="0">Ativo</option>
                                <option value="1">Inativo</option>
                            </select>
                        
                        </div>
            
                        <div className="sec-input-2">
                            <input className="text-area" type="text" value={descricao} name="descricao" id="" onChange={(event) => setDescricao(event.target.value)} placeholder="Descricao" required />
                        </div>

                        <p className="msgSucess">{mensageSucess}</p>

                    <button type="submit">Cadastrar</button>
            </form>
            
        
        </div>
</body>

    )
}