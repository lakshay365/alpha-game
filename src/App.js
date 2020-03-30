import React, { Component } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import { GlobalHotKeys } from "react-hotkeys";
import OptionsContainer from "./components/OptionsContainer";
import ScoreBoard from "./components/ScoreBoard";
import { kahi } from "./lang/ka-hi";
import "react-circular-progressbar/dist/styles.css";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "PAUSED",
      prompt: null,
      options: [],
      correct: -1,
      selected: false,
      number: 0,
      seen: 0,
      score: 0
    };
  }

  loadQuiz() {
    let prompts = [];
    let options = [];

    while (prompts.length < 4) {
      const x = kahi[Math.floor(Math.random() * kahi.length)];

      if (prompts.includes(x[0])) continue;

      prompts.push(x[0]);
      options.push(x[1]);
    }

    let correct = Math.floor(Math.random() * 4);

    // avoid repeating same prompts
    if (prompts[correct] === this.state.prompt) correct = (correct + 1) % 4;

    this.setState({
      prompt: prompts[correct],
      options,
      correct,
      selected: false
    });
  }

  handlePlay() {
    this.loadQuiz();
    this.setState({ status: "READY", number: 0.0 });
    setTimeout(() => this.setState({ number: 100 }), 100);
    this.startTimer = setTimeout(() => this.setState({ status: "PLAY" }), 2100);
  }

  handlePause() {
    this.setState({ status: "PAUSED", number: 0.0 });
    clearInterval(this.startTimer);
  }

  handleSelect(score) {
    setTimeout(() => this.handlePlay(), 2000);

    this.setState({
      score: this.state.score + score,
      seen: this.state.seen + 1
    });
  }

  render() {
    let prompt;

    if (this.state.status === "PAUSED" || this.state.status === "READY")
      prompt = (
        <GlobalHotKeys
          keyMap={{ TOGGLE: "space" }}
          handlers={{
            TOGGLE: () => {
              this.state.status === "PAUSED"
                ? this.handlePlay()
                : this.handlePause();
            }
          }}
        >
          <CircularProgressbarWithChildren
            className="App-loading-icon"
            value={this.state.number}
            styles={buildStyles({
              pathTransitionDuration: 2,
              pathColor: "#18b0b0",
              trailColor: "#0000"
            })}
          >
            {this.state.status === "PAUSED" ? (
              <img
                className="App-play-button"
                src={process.env.PUBLIC_URL + "/play.svg"}
                alt="play button"
                onClick={() => this.handlePlay()}
              />
            ) : (
              <img
                className="App-pause-button"
                src={process.env.PUBLIC_URL + "/pause.svg"}
                alt="pause button"
                onClick={() => this.handlePause()}
              />
            )}
          </CircularProgressbarWithChildren>
        </GlobalHotKeys>
      );
    else if (this.state.status === "PLAY")
      prompt = <p className="App-alpha">{this.state.prompt}</p>;

    return (
      <div className="App">
        <header className="App-header">
          <ScoreBoard seen={this.state.seen} score={this.state.score} />
          <div className="App-alpha-container">{prompt}</div>
          {this.state.status === "PLAY" && (
            <OptionsContainer
              options={this.state.options}
              correct={this.state.correct}
              selected={false}
              onSelect={this.handleSelect.bind(this)}
            />
          )}
        </header>
      </div>
    );
  }
}
