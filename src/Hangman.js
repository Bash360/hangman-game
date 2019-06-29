import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from './words';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };
  static counter = 0;

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord()};
    this.handleGuess = this.handleGuess.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleReset() { 
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
    Hangman.counter = 0;
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }
  getHint= ()=>{ 
    let random = Math.floor(Math.random()*this.state.answer.length);
    let letter = this.state.answer[random];
    return { random, letter };
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    Hangman.counter++;
    let { random,letter}=this.getHint();
    let isGameOver = this.state.nWrong >= this.props.maxWrong;
    let isWinner = this.guessedWord().join("") === this.state.answer;
    let gameState = this.generateButtons();
    if (isGameOver) gameState = "You Lose";
    if (isWinner) gameState = "You Win";
    const altText = `${this.state.nWrong} out of ${this.props.maxWrong} guesses`;
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altText} />
        {Hangman.counter<=1&&<p>Word has {`"${letter}" at position: ${random + 1}`}</p>}
        <p>Number of wrong guesses {this.state.nWrong}</p>
        <p>Number of chances left {this.props.maxWrong-this.state.nWrong}</p>
        <p className='Hangman-word'>{!isGameOver?this.guessedWord():this.state.answer}</p>
        <p className='Hangman-btns'>{gameState}
        </p>
        <button id="reset" onClick={this.handleReset}>Reset?</button>
       
        
      </div>
    );
  }
}

export default Hangman;
