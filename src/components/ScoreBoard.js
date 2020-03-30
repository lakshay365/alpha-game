import React from "react";
import "./ScoreBoard.css";

function getColor(score) {
  if (score > 0) return "#04fb18";
  else if (score < 0) return "red";

  return "yellow";
}

export default ({ seen, score }) => (
  <div className="ScoreBoard">
    <span className="ScoreBoard-item">Seen: {seen}</span>
    <span className="ScoreBoard-item">
      Score: <span style={{ color: getColor(score) }}>{score}</span>
    </span>
  </div>
);
