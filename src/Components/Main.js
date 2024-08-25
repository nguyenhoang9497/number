import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      pointsInput: 0,
      points: [],
      counter: 1,
      second: 0,
      timeDecimal: 0,
      timer: {},
      fadeTimer: 100,
      isClear: false,
      isGameOver: false,
      isRestart: false,
      isPlay: false,
      titleColor: "black",
    };
  }

  addCoordinates() {
    var isClear = this.state.isClear;
    var isGameOver = this.state.isGameOver;
    var isRestart = this.state.isRestart;
    var titleColor = this.state.titleColor;
    var isPlay = this.state.isPlay;
    isClear = false;
    isGameOver = false;
    isRestart = true;
    titleColor = "black";
    isPlay = true;
    const counter = 1;
    const pointsInput = this.state.pointsInput;
    const points = new Array(Number(this.state.pointsInput))
      .fill(0)
      .map((p, index) => this.getRandomCoordinates(pointsInput - index));
    this.setState({
      points: points,
      counter: counter,
      isClear: isClear,
      isGameOver: isGameOver,
      isRestart: isRestart,
      titleColor: titleColor,
      isPlay: isPlay,
    });
    this.timer();
  }

  updateItems(number) {
    const old = this.state.points;
    var counter = this.state.counter;
    var isGameOver = this.state.isGameOver;
    var titleColor = this.state.titleColor;
    if (number === counter) {
      old[old.length - 1].isActive = true;
      this.fadeTimer(old.length - 1);
      this.setState({ counter: counter, points: old });
    } else {
      isGameOver = true;
      titleColor = "red";
      this.stopTimer();
      this.setState({ isGameOver: isGameOver, titleColor: titleColor });
    }
  }

  getRandomCoordinates(number) {
    const x = 10 + Math.floor(Math.random() * 670);
    const y = 10 + Math.floor(Math.random() * 670);
    const isActive = false;
    return { x, y, isActive, number };
  }

  timer() {
    var timer = this.state.timer;
    clearInterval(this.state.timer);
    var timeDecimal = this.state.timeDecimal;
    var second = this.state.second;
    timeDecimal = 0;
    second = 0;
    this.setState({
      timer: setInterval(() => {
        if (timeDecimal === 9) {
          second++;
          timeDecimal = 0;
        } else {
          timeDecimal++;
        }
        this.setState({ timeDecimal: timeDecimal, second: second });
      }, 100),
    });
  }

  fadeTimer(index) {
    const old = this.state.points;
    const fadeTimer = this.state.fadeTimer;
    var counter = this.state.counter;
    var isClear = this.state.isClear;
    var titleColor = this.state.titleColor;
    setTimeout(() => {
      old.splice(index, 1);
      counter++;
      this.setState({ counter: counter, points: old });
      if (old.length == 0) {
        this.stopTimer();
        isClear = true;
        titleColor = "green";
        this.setState({ isClear: isClear, titleColor: titleColor });
      }
    }, fadeTimer);
  }

  showTimer() {
    const timeDecimal = this.state.timeDecimal;
    const second = this.state.second;
    if (timeDecimal == 0 && second == 0) {
      return "0";
    } else {
      return second + "." + timeDecimal + "s";
    }
  }

  stopTimer() {
    const timer = this.state.timer;
    clearInterval(timer);
    this.setState({ timer: timer });
  }

  titleRender() {
    const isClear = this.state.isClear;
    const isGameOver = this.state.isGameOver;
    const isRestart = this.state.isRestart;

    if (isClear) {
      return "All Cleared";
    } else if (isGameOver) {
      return "Game Over";
    } else if (isRestart) {
      return "Let's Play";
    } else {
      return "Let's Play";
    }
  }

  buttonRender() {
    const isPlay = this.state.isPlay;
    if (!isPlay) {
      return "Play";
    } else {
      return "Restart";
    }
  }

  render() {
    const points = this.state.points;
    const titleColor = this.state.titleColor;

    return (
      <div className="row">
        <h1 style={{ color: titleColor }}>{this.titleRender()}</h1>
        <div className="container">
          <div className="row">
            <div className="col">Points: </div>
            <div className="col-11">
              <input
                type="text"
                value={this.state.pointI}
                onChange={(e) => this.setState({ pointsInput: e.target.value })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">Time: </div>
            <div className="col-11">{this.showTimer()}</div>
          </div>
          <span className="row" style={{ height: "20px" }} />
          <button onClick={this.addCoordinates.bind(this)}>
            {this.buttonRender()}
          </button>
          <span className="row" style={{ height: "20px" }} />
          <div
            style={{
              width: "700px",
              height: "700px",
              border: "2px solid black",
            }}
          >
            <svg height="700" width="700" xmlns="http://www.w3.org/2000/svg">
              {points.map((p, index) => (
                <>
                  <circle
                    id={index}
                    onClick={() => {
                      this.updateItems(p.number);
                    }}
                    key={index}
                    r="20"
                    cx={p.x}
                    cy={p.y}
                    fill={p.isActive ? "red" : "white"}
                    stroke="black"
                    strokeWidth="3"
                  />
                  <text
                    onClick={() => this.updateItems(p.number)}
                    fill="black"
                    textAnchor="middle"
                    x={p.x}
                    y={p.y + 5}
                  >
                    {p.number}
                  </text>
                </>
              ))}
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
