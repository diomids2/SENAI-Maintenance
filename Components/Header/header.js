 import '../../App.css'
 import Logo from '../../assets/logo.png'
 import { Link } from 'react-router-dom' 
 
 export default function Header(){

    function loggout(){
        localStorage.removeItem('usuario-login')
    }
    
    return(
        <div className="aside">
        <img src={Logo} alt="Logo senai"></img>
        <nav className="menu">
            <ul>
                <li><Link className="a" to="/colaborador" >Ordem de serviço</Link></li>
                <li><Link className="a" to="/listarturmas">Solicitar suporte</Link></li>
                <li><Link className="a" to="/listaralunos" >Historico de serviço</Link></li>
                <li><Link className="a" to="/perfil">Perfil</Link></li>
                <li class="sair"><Link onClick={loggout} className="a" to="/">Sair</Link></li>
            </ul>
        </nav>
    </div>
    )
}