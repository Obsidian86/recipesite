import React, { Component } from 'react'; 
import './styles/App.css';
import HeaderComponent from './components/HeaderComponent';
import MainBodyComponent from './components/MainBodyComponent';
import { BrowserRouter as Router} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <HeaderComponent />
          <div className="center">
            <MainBodyComponent />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
