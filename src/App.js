import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    const canvas = this.refs.canvas;
    window.addEventListener('paste', handlePasteEvent);

    function handlePasteEvent(event) {
      event.preventDefault();
      event.stopPropagation();

      // do nothing if clipboard is empty
      if (!event.clipboardData) {
        console.log('nothing in clipboard!');
        return;
      }

      const items = event.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.includes('image')) {
          const blob = items[i].getAsFile();
          const ctx = canvas.getContext('2d');
          const img = new Image();
          img.onload = function() {
            canvas.width = this.width;
            canvas.height = this.height;
            ctx.drawImage(img, 0, 0);
          }
          img.src = window.URL.createObjectURL(blob);

          window.Tesseract.recognize(blob)
            .progress(message => console.log(message))
            .catch(err => console.error(err))
            .then(result => {
              result.lines.forEach(line => console.log(line.text));
            });

        }
      }
    }
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <canvas ref="canvas" className="canvas"></canvas>
        </header>
      </div>
    );
  }
}

export default App;
