import React, { Component } from 'react';
import './App.css'; // Add your CSS styles here
import './ForkListMovement.css'; // Add your CSS styles here

class ForkListMovement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStop: null,
      popupState:false
    };
  }

  handleCircleClick1 = (point, deviceId) => {
    alert(`Title: ${point.title}\nDevice: ${deviceId}\nDuration: ${point.duration}\nCoordinates: (${point.x}, ${point.y})`);
  };

  handleCircleClick = (point, deviceId) => {
      console.log("Clicked on stop point:", point, deviceId);

    this.setState({ selectedStop: { point, deviceId } });
  };

  handleClosePopup = () => {
    this.setState({ selectedStop: null });
  };

  render() {
    const canvasWidth = 700;
    const canvasHeight = 900;
    const axisPadding = 20;
    const axisLength = canvasWidth - 2 * axisPadding;

    const { path, stopPoints, imageUrl, unit, deviceId } = this.props; // Access path and stopPoints from props


    return (
      <div className="canvas-container">
        <svg width={canvasWidth} height={canvasHeight} style={{ backgroundImage: `url(${imageUrl})`,border:'1px'}}>
          {/* Draw X-axis scale markings */}
          {/* Array.from({ length: 21 }).map((_, index) => {
            const x = (index - 10) * (axisLength / 20) + canvasWidth / 2;
            const textX = x + 5;
            const textY = canvasHeight / 2 + 20;
            const coordinateX = (index - 10) * unit; // Calculate the X coordinate based on the unit

            return (
              <g key={index}>
                <line x1={x} y1={canvasHeight / 2 - 5} x2={x} y2={canvasHeight / 2 + 5} stroke="black" />
                <text x={textX} y={textY} textAnchor="middle" fontSize="12" fill="black">
                  {coordinateX}
                </text>
              </g>
            );
          })}

          {/* Draw Y-axis scale markings */}
          {/*Array.from({ length: 21 }).map((_, index) => {
            const y = canvasHeight / 2 + (10 - index) * (axisLength / 20); // Reverse the Y-axis coordinates
            const textX = canvasWidth / 2 + 20;
            const textY = y + 5;
            const coordinateY = (index - 10) * unit; // Calculate the Y coordinate based on the unit
            return (
              <g key={index}>
                <line x1={canvasWidth / 2 - 5} y1={y} x2={canvasWidth / 2 + 5} y2={y} stroke="black" />
                <text x={textX} y={textY} textAnchor="middle" fontSize="12" fill="black">
                  {coordinateY}
                </text>
              </g>
            );
          })}


          {/* Draw the path */}
          <polyline
            points={path
              .map((point) => `${(point.x/unit * axisLength) / 20 + canvasWidth / 2},${canvasHeight / 2 - (point.y/unit * axisLength) / 20}`)
              .join(' ')}
            fill="none"
            stroke="blue"
            strokeWidth="2"
          />

          {/* Draw stop points as circles */}
           {Array.isArray(stopPoints) &&  stopPoints.map((point, index) => (
            <circle
              key={index}
              cx={(point.x/unit * axisLength) / 20 + canvasWidth / 2}
              cy={canvasHeight / 2 - (point.y/unit * axisLength) / 20}
              r="7"
              fill="red"
              onClick={() => this.handleCircleClick(point,deviceId)}
            />
          ))}

         
        </svg>
          {/* Render the Popup when a stop is selected */}
        {this.state.selectedStop && (
          <div className="glassy-popup">
            <h3>Title: {this.state.selectedStop.point.title}</h3>
            <p>Device: {this.state.selectedStop.deviceId}</p>
            <p>Duration: {this.state.selectedStop.point.duration}</p>
            <button onClick={this.handleClosePopup}>Close</button>
          </div>
        )}
      </div>
    );
  }
}

export default ForkListMovement;
