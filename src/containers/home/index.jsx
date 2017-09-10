import React, { Component } from 'react';
import Board from './components/Board';
import './style.scss';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      gameOver: false,
    };
  }

  componentWillMount = () => {
    if (localStorage.progress) {
      this.setState({
        gameInProgress: true,
      });
    }
  }

  handleGameOver = (score) => {
    this.setState({
      gameOver: true,
      score,
    }, () => {
      localStorage.removeItem('progress');
    });
  }

  handleResume = () => {
    this.boardMethods.resumeGame();
    this.setState({
      gameInProgress: false,
    });
  }

  handleRestart = () => {
    this.boardMethods.restartGame();
    this.setState({
      gameOver: false,
      gameInProgress: false,
    });
  }

  render() {
    return (
      <div className="game-wrapper">
        <Board
          row={8}
          onGameOver={this.handleGameOver}
          componentMethods={(methods) => { this.boardMethods = methods; }}
        />
        { this.state.gameOver &&
          <section className="game-results">
            <h1>You Won!</h1>
            <h2>Score: {this.state.score}</h2>
            <div>
              <button className="btn btn-restart" onClick={this.handleRestart}>Start A New Game</button>
            </div>
          </section>
        }
        { this.state.gameInProgress &&
          <section className="game-resume">
            <h1>You have an Unfinished Game!</h1>
            <h3>Do you like to resume?</h3>
            <div>
              <button className="btn btn-resume" onClick={this.handleResume}>Resume Last Game</button>
              <button className="btn btn-restart" onClick={this.handleRestart}>Start A New Game</button>
            </div>
          </section>
        }
      </div>
    );
  }
}

export default Home;
