import React, { Component } from 'react';
import * as utils from './utils.js';

export default class WordGame extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        currentWord:{},
        choices:[]
      };
  
      this.handleCheckWord = this.handleCheckWord.bind(this);
      this.handleNextWord = this.handleNextWord.bind(this);
      
    }
    componentWillMount() {
      this.nextWord();
    }
    getWord() {
      var rand = utils.getRandom(0,this.props.words.length-1);
      var word =  this.props.words[rand];
      return JSON.parse(JSON.stringify(word)); // copy as value
    }
    nextWord() {
      var currentWord = this.getWord();
  
      var choices = [
        this.getWord(),
        this.getWord(),
        this.getWord(),
        this.getWord(),
      ];
  
      var correctPlace = utils.getRandom(0,choices.length);
      choices.splice(correctPlace,0,currentWord);
  
  
      this.setState({
        currentWord:currentWord,
        choices:choices
      })
    }
    handleNextWord(){
      this.nextWord();
    }
  
    handleCheckWord(e) {
  
      var answerNum = e.target.getAttribute('data-index');
      var answerWord = this.state.choices[answerNum];
  
      answerWord.isRight = answerWord.word === this.state.currentWord.word;
      answerWord.isWrong = answerWord.word !== this.state.currentWord.word;
      
      this.setState({
        choices:this.state.choices
      });
  
    }
    render() {
      var self = this;
      return (
  
        <div>
          <header className="App-header">
          <a className="next" onClick={this.handleNextWord}>&#x25B6;</a>
          
            <h1 className="App-title">{this.state.currentWord.definition}</h1>
          </header>
          <div>
          {this.state.choices.map(function(choice,index) {
            var className = 'choice';
            if (choice.isRight) {
              className += ' right';
            }
            else if (choice.isWrong) {
              className += ' wrong';
            }
            return (
              <h2 className={className} key={index} data-index={index} onClick={self.handleCheckWord}>{choice.word}</h2>
            )
          })}
  
        </div>
  
          
        </div>
      );
    }
  }
  