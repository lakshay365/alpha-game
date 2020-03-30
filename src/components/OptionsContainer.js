import React, { Component } from "react";
import LoadingBar from "react-top-loading-bar";
import Option from "./Option";
import "./OptionsContainer.css";
import { GlobalHotKeys } from "react-hotkeys";

export default class OptionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: false, time: 10 };
  }

  handleClick(id) {
    if (this.state.selected !== false) return;

    clearInterval(this.timer);

    this.setState({ selected: id });

    let score = this.state.time;
    if (id !== this.props.correct) score -= 10;

    this.props.onSelect(score);
  }

  updateTime(time) {
    if (time < 0) {
      this.handleClick(-1);
      return;
    }

    this.setState({ time: time });

    this.timer = setTimeout(() => this.updateTime(time - 1), 1000);
  }

  componentDidMount() {
    this.updateTime(10);
  }

  render() {
    const keyMap = {
      SELECT_A: "a",
      SELECT_B: "b",
      SELECT_C: "c",
      SELECT_D: "d"
    };

    const handlers = {
      SELECT_A: () => this.handleClick(0),
      SELECT_B: () => this.handleClick(1),
      SELECT_C: () => this.handleClick(2),
      SELECT_D: () => this.handleClick(3)
    };

    return (
      <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
        <div className="OptionsContainer">
          <LoadingBar
            progress={this.state.time * 10}
            color="#18b0b0"
            height={5}
          />
          {this.props.options.map((option, index) => (
            <Option
              id={index}
              key={index}
              value={option}
              selected={this.state.selected}
              correct={this.props.correct}
              onClick={this.handleClick.bind(this)}
            />
          ))}
        </div>
      </GlobalHotKeys>
    );
  }
}
