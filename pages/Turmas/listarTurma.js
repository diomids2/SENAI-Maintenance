import Header from "../../Components/Header/header";
import { useEffect, useState } from "react";
import axios from "axios";
import '../../App.css';

export default function ListarTurmas(){
    const[listaTurmas, setListaTurmas] = useState([])


    function buscarTurmas(){

    }

useEffect(buscarTurmas, [])    

    return(
        <body className="body-aluno">
            <Header />
            <div className="container">
                <h2>Turmas</h2>
                <section className="lista20">
                    <div className="lista">
                        <div class="linha1">
                            <p>Título:</p>
                            <p>Número da sala:</p>
                            <div className="status"></div>
                        </div>
                    </div>
                </section>
            </div>
        </body>
    )
}