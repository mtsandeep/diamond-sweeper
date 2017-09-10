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

  handleGameOver = (score) => {
    this.setState({
      gameOver: true,
      score,
    });
  }

  handleRestart = () => {
    this.boardMethods.restartGame();
    this.setState({
      gameOver: false,
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
            <h2>You won</h2>
            <p>Score: {this.state.score}</p>
            <div className="restart">
              <button className="btn" onClick={this.handleRestart}>Restart</button>
            </div>
          </section>
        }
      </div>
    );
  }
}

export default Home;
