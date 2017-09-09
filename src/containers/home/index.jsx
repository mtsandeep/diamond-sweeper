import React, { Component } from 'react';
import Board from './components/Board';

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

  render() {
    return (
      <div className="game-wrapper">
        <Board
          row={8}
          onGameOver={this.handleGameOver}
        />
        { this.state.gameOver &&
          <section className="game-results">
            <p>You won</p>
            <p>Score: {this.state.score}</p>
          </section>
        }
      </div>
    );
  }
}

export default Home;
