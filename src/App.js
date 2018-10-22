import React, { Component } from 'react'; 
import './styles/App.css';
import HeaderComponent from './components/HeaderComponents/HeaderComponent';
import MainBodyComponent from './components/MainBodyComponent';
import { BrowserRouter as Router} from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import { apiCall } from './services/api';

class App extends Component {
  
  constructor(){
    super();
    this.state = ({ 
      hasSearched: false,
      loggedIn: false,
      loadSaved: false,
      message: {
          text: "",
          cName: "m_green"
      },
      profile:{
        email:  "",
        id: ""
      }
    });
    this.logToggle.bind(this);
  }

  updateMessage = (text, cName)=>{ 
    this.setState( {message: {
        text: text,
        cName: cName
    }}); 
} 
  updateSearch =() => {
    this.setState({ hasSearched: true });  
  }
  setLoaded = (status) => {
    this.setState({ loadSaved: status });
  }
  logToggle = async (logSwitch, ...rest)=>{ 
    let URL = rest.length < 3 ? "/profile/login" : "/profile/register";
    
    //if multiple password fields don't exist
    if( rest.length > 2 ){
      if( rest[1] !== rest[2]){
        this.setState({
          message: {
              text: "Passwords do not match",
              cName: "m_red"
          } 
        });
        return false;
      }
    } 

    //Simple email validation
    if(rest.length > 0){
      let email = rest[0];
      if( email.length < 4 || email.indexOf("@") < 1 || email.indexOf(".") < 1){
        this.setState({
          message: {
            text: "Username has to be an email and can't be less than 4 characters.",
            cName: "m_red"
          }
        });
        return false;
      } 
    }

    //If no errors
   
    if( logSwitch ){
      let logData = await apiCall("POST", URL, {},{"email": rest[0], "password": rest[1] });
      if( !logData.username ){
        this.updateMessage(logData.error.message, "m_red"); 
      }else{
        sessionStorage.setItem("ax", logData.token); 
        this.setState({
          loggedIn: true,
          profile:{ email:  logData.username, id: logData.id }
        });
      }
    }else{
      this.setState({
        loggedIn: false,
        profile:{ email: "" }
      }) 
    } 
  }

  render() { 
    let rendBody = this.state.loggedIn ? 
      <MainBodyComponent 
        updateSearch={this.updateSearch} 
        updateMessage={this.updateMessage} 
        message={this.state.message} 
        profile={this.state.profile}
        setLoaded={ this.setLoaded }
      /> : 
      <LoginComponent logToggle={this.logToggle} message={this.state.message} updateMessage={this.updateMessage} />;
    return (
      <Router>
        <div className="App">
           <HeaderComponent 
            hasSearched={this.state.hasSearched} 
            loggedIn={this.state.loggedIn} 
            logToggle={this.logToggle}
            loadSaved={this.state.loadSaved}
          />
          <div className="center"> { rendBody } </div>
        </div>
      </Router>
    );
  }
}

export default App;
