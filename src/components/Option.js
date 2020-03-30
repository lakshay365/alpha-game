import React, { Component } from "react";
import "./Option.css";

export default class Option extends Component {
  render() {
    const { selected, correct, id } = this.props;

    let bgColor = "#282c34";

    if (selected === false) bgColor = "#282c34";
    else if (selected === id) bgColor = correct === id ? "green" : "red";
    else if (correct === id) bgColor = "green";

    return (
      <div
        onClick={() => this.props.onClick(this.props.id)}
        className="Option"
        style={{
          backgroundColor: bgColor,
          cursor: selected ? "not-allowed" : "pointer"
        }}
      >
        <span className="Option-id">
          {String.fromCharCode(65 + this.props.id)}
        </span>
        <span className="Option-value">{this.props.value}</span>
      </div>
    );
  }
}
