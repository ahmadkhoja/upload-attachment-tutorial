import React from 'react';
import './Home.css';
import SocketIO from 'socket.io-client';
import SocketIOFileClient from 'socket.io-file-client';
import fetch from 'node-fetch';

 const UploadedImage = ({image}) => {
    return (
      <p>
        <img src={image} width="100px" height="100px" alt="batata"/> <br/>
      </p>
    )
}
export default class UploadedImages extends React.Component{
  constructor(){
    super()
    this.state = {
      images:[], 
      // loading_progress:'loading',
      message:'error'
    }
  }
  loadImages = () => {
    // this.setState({loading_progress:'loading'})
    fetch('/images')
    .then(r=>r.json())
    .then(response=>{
      this.setState({images:response.images,/*loading_progress:'success'*/});
      return response
    })
    // .catch(err => this.setState({/*loading_progress:'error',*/ message:err.message}))  
  }
  componentDidMount(){
    this.loadImages()
    const socket = SocketIO('http://localhost:3002');
    const uploader = new SocketIOFileClient(socket);
    uploader.on('start', (fileInfo) => {
      console.log('Start uploading', fileInfo);
    });
    uploader.on('stream', (fileInfo) => {
      console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
    });
    uploader.on('complete', (fileInfo) => {
      console.log('Upload Complete', fileInfo);
    });
    uploader.on('error', (err) => {
      console.log('Error!', err);
    });
    uploader.on('abort', (fileInfo) => {
      console.log('Aborted: ', fileInfo);
    });

    this.setState({uploader})
  }
  onSubmit = (evt)=>{
    evt.preventDefault()
    const form = evt.target
    const photoField = form.photo
    const files = photoField.files
    console.log(files)
    this.state.uploader.upload(files,{data:{username:'batata'}});
  }
  render(){
    return(
        <div className="uploadForm">
          <h1>Upload a photo!</h1> 
          <form onSubmit={this.onSubmit} >
                <div className="section">Note: Only image files are allowed.</div>
                <div className="inner-wrap">
                  <label><input type="file" id="photo" name="photo"/></label>
                  <div className="button-section">
                    <input type="submit" name="Upload" value="Upload Photo"/>
                  </div>
                </div>
          </form>
          {(this.state.images ? 
    <div>{this.state.images.map( (image)=> <UploadedImage image={'/images/'+image.name} key={image.name}/>)}</div>
          :null )}
      </div>
    ) 
  }
}


