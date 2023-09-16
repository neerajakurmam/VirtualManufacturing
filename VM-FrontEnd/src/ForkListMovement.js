import React, { Component } from 'react';
import './App.css'; // Add your CSS styles here

class ForkListMovement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStop: null,
    };
  }

  handleCircleClick = (point) => {
    alert(`S: ${point.title}\nD: ${point.duration}\nCoordinates: (${point.x}, ${point.y})`);
  };

  render() {
    const canvasWidth = 800;
    const canvasHeight = 800;
    const axisPadding = 20;
    const axisLength = canvasWidth - 2 * axisPadding;

    const { path, stopPoints, imageUrl } = this.props; // Access path and stopPoints from props


    return (
      <div className="canvas-container">
        <svg width={canvasWidth} height={canvasHeight} style={{ backgroundImage: `url(${imageUrl})` }}>
          {/* Draw X-axis scale markings */}
          {/* Array.from({ length: 21 }).map((_, index) => {
            const x = (index - 10) * (axisLength / 20) + canvasWidth / 2;
            const textX = x + 5;
            const textY = canvasHeight / 2 + 20;
            return (
              <g key={index}>
                <line x1={x} y1={canvasHeight / 2 - 5} x2={x} y2={canvasHeight / 2 + 5} stroke="black" />
                <text x={textX} y={textY} textAnchor="middle" fontSize="12" fill="black">
                  {index - 10}
                </text>
              </g>
            );
          })}

          {/* Draw Y-axis scale markings */}
          {/*Array.from({ length: 21 }).map((_, index) => {
            const y = canvasHeight / 2 - (index - 10) * (axisLength / 20);
            const textX = canvasWidth / 2 + 20;
            const textY = y + 5;
            return (
              <g key={index}>
                <line x1={canvasWidth / 2 - 5} y1={y} x2={canvasWidth / 2 + 5} y2={y} stroke="black" />
                <text x={textX} y={textY} textAnchor="middle" fontSize="12" fill="black">
                  {index - 10}
                </text>
              </g>
            );
          })}

          {/* Draw the path */}
          <polyline
            points={path
              .map((point) => `${(point.x * axisLength) / 20 + canvasWidth / 2},${canvasHeight / 2 - (point.y * axisLength) / 20}`)
              .join(' ')}
            fill="none"
            stroke="blue"
            strokeWidth="2"
          />

          {/* Draw stop points as circles */}
           {Array.isArray(stopPoints) &&  stopPoints.map((point, index) => (
            <circle
              key={index}
              cx={(point.x * axisLength) / 20 + canvasWidth / 2}
              cy={canvasHeight / 2 - (point.y * axisLength) / 20}
              r="7"
              fill="red"
              onClick={() => this.handleCircleClick(point)}
            />
          ))}
        </svg>
      </div>
    );
  }
}

export default ForkListMovement;
