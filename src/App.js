import React, { Component } from 'react'; 
import './styles/App.css';
import HeaderComponent from './components/HeaderComponent';
import MainBodyComponent from './components/MainBodyComponent';
import { BrowserRouter as Router} from 'react-router-dom';
import LoginComponent from './components/LoginComponent';

class App extends Component {

  constructor(){
    super();
    this.state = ({ 
      hasSearched: false,
      loggedIn: true
    });
  }

  updateSearch =() => {
    this.setState({ hasSearched: true });  
  }

  logToggle = (logSwitch) =>{
    this.setState({
      loggedIn: logSwitch
    })
  }

  render() {
    let rendBody = this.state.loggedIn ? 
      <MainBodyComponent  updateSearch={this.updateSearch} /> : 
      <LoginComponent logToggle={this.logToggle} />;
    return (
      <Router>
        <div className="App">
          <HeaderComponent 
            hasSearched={this.state.hasSearched} 
            loggedIn={this.state.loggedIn} 
            logToggle={this.logToggle}
          />
          <div className="center"> 
            { rendBody }
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
