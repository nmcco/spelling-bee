import React, { Component } from 'react';
import * as utils from './utils.js';

/*global responsiveVoice b:true*/

export default class SpellingGame extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        currentWord:{},
        wordPlaceholer:"_____"
      };
  
      this.handleCheckWord = this.handleCheckWord.bind(this);
      this.handleNextWord = this.handleNextWord.bind(this);
      this.handleSpeakWord = this.handleSpeakWord.bind(this);
      this.handleAnswerEnter = this.handleAnswerEnter.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleShowWord = this.handleShowWord.bind(this);
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

      this.setState({
        currentWord:currentWord,
        answer:'',
        isCorrect:false,
        isIncorrect:false,
        showWord:false
      })
    }
    componentDidMount() {
      //this.speakWord();
    }
    handleSpeakWord(e) {
      e.preventDefault();
      this.speakWord();
    }
    speakWord() {
      responsiveVoice.speak(this.state.currentWord.word,'US English Female');
      
    }
    handleNextWord(){
      this.nextWord();
    }
  
    handleCheckWord(e) {

     var isCorrect = this.state.answer == this.state.currentWord.word;
     this.setState({
       isCorrect:isCorrect,
       isIncorrect:!isCorrect
     });
      
    }
    handleShowWord(e) {
      e.preventDefault();

      this.setState({
        showWord:true
      });
    }
    handleAnswerEnter(e) {
      if (e.key == 'Enter') {
        this.handleCheckWord();
      }
    }
    handleChange(e) {
      this.setState({
        [e.target.name]:e.target.value
      });
    }
    render() {
      var self = this;
      return (
  
        <div>
          <header className="App-header">
            <a className="next" onClick={this.handleNextWord}>&#x25B6;</a>
    
            <h1 className="App-title">{this.state.showWord ? this.state.currentWord.word : '' }<a className="play-word" href="#" onClick={this.handleSpeakWord}>&#x1f50a;</a></h1>
          </header>
          <div>
            <input type="text" className="answer-box" onChange={this.handleChange} onKeyPress={this.handleAnswerEnter} name="answer" value={this.state.answer} placeholder={this.state.wordPlaceholer} 
            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="off" 
            />
            <button className="check-answer" value="Check" onClick={this.handleCheckWord}>Check</button>
  
<div>{this.state.isIncorrect}</div>
            {this.state.isCorrect ? <div className="word-result correct">Correct!</div> : null }
        
            {this.state.isIncorrect ? <div className="word-result incorrect">Incorrect</div> : null }

           <a href="#" onClick={this.handleShowWord}>Show Word</a>
           
                </div>
  
          
        </div>
      );
    }
  }
  