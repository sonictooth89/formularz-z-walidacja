import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    accept: false,
    message: '',

  errors: {
    username: false,
    email: false,
    password: false,
    accept: false,
    }

    }

    messages = {
      username_incorrect: 'Nazwa musi byc dluzsza niz 10 znakow i nie moze zawierac spacji',
      email_incorrect: 'Brak @ w adresie email',
      password_incorrect: 'Haslo musi miec 8 znakow',
      accept_incorrect: 'Nie potwierdzona zgoda',
    }
    
  handleChange = (e) => {

    const name = e.target.name;
    const type = e.target.type;

    if(type === "text" || type === "password" || type === "email") {
    const value = e.target.value;
    this.setState({
      [name]: value,
    })
  } else if (type === "checkbox") {
    const checked = e.target.checked;
    this.setState({
      [name]: checked,
    })
  }
}  

    handleSubmit = (e) => {
      e.preventDefault();
     
      const validation = this.formValidation()
      console.log(validation);
      
      if(validation.correct) {
        this.setState({
          username: '',
          email: '',
          pass: '',
          accept: false,
          message: 'Formularz zostal wyslany',

          errors: {
            username: false,
            email: false,
            password: false,
            accept: false,
          }
        })
        console.log('Formularz wyslany');
      } else {
        this.setState({
          errors: {
            username: !validation.username,
            email: !validation.email,
            password: !validation.password,
            accept: !validation.accept,
          }
        })
      }
    }

    formValidation = () => {
      // true - ok
      //false - zle
      let username = false;
      let email = false;
      let password = false;
      let accept = false;
      let correct = false

      if(this.state.username.length > 10 && this.state.username.indexOf(' ') === -1) {
        username = true;
      };

      if(this.state.email.indexOf('@') !== -1) {
        email = true;
      };

      if(this.state.password.length === 8) {
        password = true;
      };

      if(this.state.accept) {
        accept = true;
      }

      if(username && email && password && accept) {
        correct = true;
      }

      return ({
        correct,
        username,
        email,
        password,
        accept
      })
    }

    componentDidUpdate() { // nie trzeba bindowc bo te funkcje cyklu zycie komponentu odwoluja sie do tego komponentu!
      console.log('update');
      if(this.state.message !== '') {
        setTimeout(() => this.setState({
          message: ''
        }), 3000)
      }
    }

  


  render() { 
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="user">Twoje imie: 
          <input type="text" id="user" name="username" value={this.state.username} onChange={this.handleChange} />
            {this.state.errors.username && <span>{this.messages.username_incorrect}</span>}
          </label>

          <label htmlFor="email">Twoj adress email: 
          <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange}/>
          {this.state.errors.email && <span>{this.messages.email_incorrect}</span>}
          </label>

          <label htmlFor="password">Twoje haslo: 
          <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          {this.state.errors.password && <span>{this.messages.password_incorrect}</span>}
          </label>

          <label htmlFor="accept">
            <input type="checkbox" id="accept" name="accept" checked={this.state.value} onChange={this.handleChange}/> Wyrazam zgode wszelaka
            {this.state.errors.accept && <span>{this.messages.accept_incorrect}</span>}
          </label>

          <button>Zapisz</button>
        </form>
        {this.state.message && <h3>{this.state.message}</h3>}
      </div>
    );
  }
}
 
export default App;
