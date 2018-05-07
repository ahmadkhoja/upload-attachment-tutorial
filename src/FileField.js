import React from 'react'

export default class FileField extends React.Component {
    state = {
      files: []
    };
    
    onFileAdded = evt => {
      // transforms the list of files into a proper array
      const files = [...evt.target.files];
      // sets the files in state
      files.push(files);
      this.setState({ files });
    };
    onSubmit = evt => {
      // stop the form from refreshing
      evt.preventDefault();
      const { files } = this.state;
      // prepare to send the files
      const body = new FormData();
      files.map((f, i) => body.append(`files[${i}]`, f));
      // if we wanted to send more stuff, we could add them:
      // body.append('text', evt.target.someInput.value)
      // now we want to send this data to a server
      // codesandbox doesn't have a server, but if it did:
      fetch('http://localhost:3000/upload-path', { method:'POST', body })
      // since it doesn't, we just log the results
      console.log(body);
    };
    render() {
      const { files } = this.state;
      return (
        <form  onSubmit={this.onSubmit} encType="multipart/form-data">
          <input type="file" name="image" onChange={this.onFileAdded} />
          <br />
          <ul>{files.map((f, i) => <li key={f.name + i}>{f.name}</li>)}</ul>
          <button>ok</button>
        </form>
      );
    }
  }
  