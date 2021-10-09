import Header from "../../Components/Header/header";
import { useEffect, useState } from "react";
import axios from "axios";
import '../../App.css';

export default function ListarAlunos(){
    const[listaAlunos, setListaAlunos] = useState([])

    return(
        <body className="body-aluno">
            <Header />
            <div className="container">
                <h2>Colaboradores</h2>
                <section className="lista20">
                    <div className="lista">
                        <div class="linha1">
                            <p>Nome:</p>
                            <p>Matrícula:</p>
                        </div>
                        <div className="status"></div>
                        <div className="linha1">
                            <p>E-mail:</p>
                            <p>Status:</p>
                        </div>
                    </div>
                </section>
            </div>
        </body>
    )
}