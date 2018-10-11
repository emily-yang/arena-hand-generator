import React, { Component } from 'react';
import './App.css';

class App extends Component {

    fileRef = React.createRef();
    submitBtn = React.createRef();
    resultsRef = React.createRef();

    getFileLocation = event => {
      event.preventDefault();
      const path = this.fileRef.current;

        const file = path.files[0];
        console.log('file is', file);
      this.fetchResults(file);
    }

     fetchResults = async (file) => {
      let text = ""
      console.log('got this far')
      const fileReader = new FileReader();
      fileReader.onload = event => {
        const results = this.resultsRef;
        text = event.target.result;
        console.log(text);
      
      }
      await fileReader.readAsText(file);
    }
    
  


  render() {
    return (
      <div className="container">
        <form>
          <input 
            type="file" 
            ref={this.fileRef} 
            placeholder="Enter file location" 
            onChange={this.getFileLocation}
          />
          <button 
            type="submit"
            className="button" 
            ref={this.submitBtn}
          >Submit</button>
        </form>
        <div className="results" ref={this.resultsRef}></div>
      </div>
    );
  }
}

export default App;
