import React, { useState } from 'react';

const ColorMixGame = () => {
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [mixedColor, setMixedColor] = useState('');

  const mixColors = () => {
    // Simple color mixing logic for demonstration
    if (color1 && color2) {
      setMixedColor(`Mixed color: ${color1} + ${color2}`);
    } else {
      setMixedColor('Please select two colors');
    }
  };

  return (
    <div>
      <h1>Interactive Color Mixing Game</h1>
      <div>
        <label>
          Choose first color:
          <input type='color' onChange={(e) => setColor1(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Choose second color:
          <input type='color' onChange={(e) => setColor2(e.target.value)} />
        </label>
      </div>
      <button onClick={mixColors}>Mix Colors</button>
      <h2>{mixedColor}</h2>
    </div>
  );
};

export default ColorMixGame;