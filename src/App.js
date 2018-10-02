import React, { Component } from 'react'; 
import './styles/App.css';
import HeaderComponent from './components/HeaderComponent';
import MainBodyComponent from './components/MainBodyComponent';
import { BrowserRouter as Router} from 'react-router-dom';

class App extends Component {

  constructor(){
    super();
    this.state = ({ hasSearched: false });
  }

  updateSearch =() => {
    this.setState({ hasSearched: true });  
  }

  render() {
    return (
      <Router>
        <div className="App">
          <HeaderComponent hasSearched={this.state.hasSearched}/>
          <div className="center">
            <MainBodyComponent  updateSearch={this.updateSearch} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
