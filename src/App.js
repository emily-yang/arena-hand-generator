import React, { Component } from 'react';
import './App.css';

class App extends Component {

    state = {
      logFileText: null
    }

    fileRef = React.createRef();
    submitBtn = React.createRef();
    resultsRef = React.createRef();

    getFileLocation = async event => {
      event.preventDefault();
      const path = this.fileRef.current;

        const file = path.files[0];

        try {
          const contents = await this.fetchResults(file);
          this.setState({
            logFileText: contents
          });
        } catch (err) {
          console.error(err);
        }
    }

    fetchResults = file => {
      let text = "default text";
      const fileReader = new FileReader();

      return new Promise((resolve, reject) => {
        fileReader.onerror = () => {
          fileReader.abort();
          reject(new DOMException("Could not parse log"));
        }

        fileReader.onload = () => {
          resolve(fileReader.result);
        }

        fileReader.readAsText(file);
      })

    }

    printResults = (text) => {
      console.log(text);
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
