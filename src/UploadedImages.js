import React from 'react';
import './Home.css';
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
      message:'error',
      imagename:''
    }
  }
  componentDidMount(){
    this.loadImages()  
  }
  loadImages = () => {
      // this.setState({loading_progress:'loading'})
      fetch('/images')
      .then(r=>r.json())
      .then(response=>this.setState({images:response.images,/*loading_progress:'success'*/}))
      // .catch(err => this.setState({/*loading_progress:'error',*/ message:err.message}))  
  }
  onChange = (event) => {
    let imagename = event.target.files[0].name;
    console.log(imagename);
    this.setState({imagename})
  }
  render(){
    return(
        <div className="uploadForm">
          <h1>Upload a photo!</h1> 
          <form action="/upload" encType="multipart/form-data" method="POST" >
                <div className="section">Note: Only image files are allowed.</div>
                <div className="inner-wrap">
                  <label><input type="file" id="photo" name="photo" onChange={this.onChange}/></label>
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


