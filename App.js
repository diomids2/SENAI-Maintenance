import axios from 'axios';
import Logo from './assets/logo.png'
import Background from './assets/Background-login.png'

import './App.css';
import { Component } from 'react';
import { parseJwt } from './services/auth';

var styleBackground = {
  width : "1879px",
  height : "939px",
  backgroundImage : "url(" + Background + ")",
  backgroundRepeat : "no-repeat",
  backgroundSize : "cover"
}

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      email : '',
      senha : '',
      erroMensagem : '',
      isLoading : false
    }
  }

    /* Realizar as conexões com os métodos vindos da API */
    login = (event) => {
      event.preventDefault();

      this.setState({erroMensagem : '' , isLoading: true})

      axios.post("http://localhost:5000/api/login", {
        email : this.state.email,
        senha : this.state.senha
      })

      .then(resposta => {
        if(resposta.status === 200)
        {
          localStorage.setItem("usuario-login", resposta.data.token)

          console.log('Meu token é: ' + resposta.data.token);

          this.setState({isLoading : false});

          console.log(parseJwt().role)

          switch (parseJwt().role){
            case '0':
              this.props.history.push('/adm')
              break;

            case '1':
              this.props.history.push('/colaborador'); 
            break;   

            default:
              this.props.history.push('/')
            break;
          }
        }
      })

      .catch(() => {
        this.setState({erroMensagem : 'Email ou senha incorretos! Tente novamente', isLoading : false})
      })
    }

    atualizarCampos = (campo) => {
      this.setState({ [campo.target.name] : campo.target.value})
    }

    

  render(){
    return(
      <body className="body-login" style={styleBackground}>
      <div className="login">
         <form onSubmit={this.login}>
             <img src={Logo} alt="Logo Senai"></img>
             <label>Email</label>
             <input name="email" onChange={this.atualizarCampos} value={this.state.email} type="email" required />
             <label>Senha</label>
             <input name="senha" onChange={this.atualizarCampos} value={this.state.senha} type="password" required />
             <p className="erro">{this.state.erroMensagem}</p>
             <button type="submit">Logar</button>
         </form>
     </div>
 </body>
    )
  }
}

export default App;
