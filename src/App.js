import React, { Component } from 'react';
import './App.css';
import './utils.js';
import VocabGame from './VocabGame';
import SpellingGame from './SpellingGame';
import WordGame from './WordGame';
import { Switch, Route, Redirect, Link } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words:[]
    };
  }
  componentWillMount() {

    var spellingWordsString = localStorage.getItem('spellingWords');

    if (spellingWordsString) {
      this.setState({
        words:JSON.parse(spellingWordsString)
      });
    }
    else {
      fetch('http://neilm.com/benjamin/spellingbee/getwords.php')
      .then(response => response.json())
      .then(data => { this.onDataReady(data); });
    }
  }
  onDataReady(data) {
    //console.info(data);

    localStorage.setItem('spellingWords', JSON.stringify(data));

    this.setState({
      words:data
    });

  }
  
  render() {
    return (
      <div> 
      <header>
      <nav>
        <ul>
          <li><Link to='/spelling'>Spelling</Link></li>
          <li><Link to='/vocab'>Vocab</Link></li>
          <li><Link to='/definition'>Definition</Link></li>
        </ul>
      </nav>
    </header>
      <Switch>
      <Route path="/spelling" render={(props) => (
          this.state.words.length ? (
          <SpellingGame words={this.state.words} />
          )
          :
        ( <Redirect to="/" /> )
        )} />
        <Route path="/vocab" render={(props) => (
          this.state.words.length ? (
          <VocabGame words={this.state.words} />
          )
          :
        ( <Redirect to="/" /> )
        )} />
       <Route path="/definition" render={(props) => (
          this.state.words.length ? (
          <WordGame words={this.state.words} />
          )
          :
        ( <Redirect to="/" /> )
        )} />
      </Switch>
      </div>
    );
  }
}


const App1 = () => (
  <div>App1</div> 
)

const App2 = () => (
  <div>App2</div> 
)

export default App;
