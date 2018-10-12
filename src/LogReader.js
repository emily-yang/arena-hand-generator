import React, {Component} from 'react';

class LogReader extends Component {
    pathRef = React.createRef();
    submitBtn = React.createRef();
    resultsRef = React.createRef();

    // getFileLocation = async event => {
    //   event.preventDefault();
    //   const path = this.fileRef.current;
    //   const file = path.files[0];

    //     try {
    //       const contents = await this.fetchResults(file);
    //       console.log(contents);
    //       this.setState({
    //         logFileText: contents
    //       });
    //     } catch (err) {
    //       console.error(err);
    //     }
    // }

    // fetchResults = file => {
    //   const fileReader = new FileReader();

    //   return new Promise((resolve, reject) => {
    //     fileReader.readAsText(file);
        
    //     fileReader.onerror = () => {
    //       fileReader.abort();
    //       reject(new DOMException("Could not parse log"));
    //     }

    //     fileReader.onload = () => {
    //       resolve(fileReader.result);
    //     }

    //   });

    // }

  render() {
    return (
      <div className="container">
        <form >
          <input 
            type="file" 
            ref={this.pathRef} 
            placeholder="Enter file location" 
            onChange={this.props.getFileLocation}
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

export default LogReader;

