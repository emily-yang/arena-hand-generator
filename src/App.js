import React, { Component } from 'react';
import LogReader from './LogReader';
import Hand from './Hand';
import './App.css';

class App extends Component {

  fileRef = React.createRef();

  state = {
    logFileText: null
  }

      getFileLocation = async event => {
      event.preventDefault();
      console.log(this.fileRef);
      const path = this.fileRef.current.pathRef.current;
      const file = path.files[0];

        try {
          const contents = await this.fetchResults(file);
          console.log(contents);
          this.setState({
            logFileText: contents
          });
        } catch (err) {
          console.error(err);
        }
    }

    fetchResults = file => {
      const fileReader = new FileReader();

      return new Promise((resolve, reject) => {
        fileReader.readAsText(file);
        
        fileReader.onerror = () => {
          fileReader.abort();
          reject(new DOMException("Could not parse log"));
        }

        fileReader.onload = () => {
          resolve(fileReader.result);
        }

      })
    }


  render() {
    return (
      <div className="wrapper">
        <LogReader ref={this.fileRef} getFileLocation={this.getFileLocation} />
        <Hand text={this.state.logFileText}/>
      </div>
    );
  }
}

export default App;
