import React from 'react';
import './Home.css';
import fetch from 'node-fetch';
// import logo from './react.svg';
// import FileField from './FileField'
// import Main from './Main'

 const UploadedImage = ({image}) => {
    return (
      <p>
        <img src={image} width="100px" height="100px" alt="batata"/> <br/>
      </p>
    )
}
export class UploadedImages extends React.Component{
  constructor(){
    super()
    this.state = {
      images:[
        {name:'amr.png'},
      ], 
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
    // const images_list = this.state.images.slice()
      fetch('/upload')
      // .then(response=>response.json())
      .then(response=> console.log('response.images',response.body)
        
      )
      // .then(response=>images_list.push(response.images))
      // .then(response=>this.setState({images:response.images,/*loading_progress:'success'*/}))
      // .then(console.log(this.state.images,'yes from here you bakka'))
        // .catch(err => this.setState({/*loading_progress:'error',*/ message:err.message}))  
  }
  onChange = (event) => {
    let imagename = event.target.files[0].name;
    console.log(imagename);
    this.setState({imagename})
  }
  // uploadImage = (event) => {
  //   // event.preventDefault()
  //   // get the form data
  //   fetch('/upload')
  //     .then( () => this.loadImages())
  //     // .catch(err => this.setState({ /*loading_progress: 'error',*/ message:err.message}))
  // }
  render(){
  //   const { loading_progress } = this.state
  //   if(loading_progress === 'loading'){
  //       return <div>...loading...</div>
  //   }
  //  else if(loading_progress === 'error'){
  //     return <div>{this.state.message}</div>
  //  }
  // console.log(this.state.images)
  // {this.loadImages}
  return(
      <div className="uploadForm">
        <h1>Upload a photo!</h1> 
        <form /*onSubmit={this.loadImages}*/ action="/upload" encType="multipart/form-data" method="POST" >
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


class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      // imagename:'',
    }
  }
  // onFormSubmit = (event) => {
  //   event.preventDefault()
  //   const imagename = this.state.imagename
  //   const name = {imagename}
  //   images.push(name)
  //   console.log(images)
  // }
  // uploadFile = (event) => {
  //   let imagename = event.target.files[0].name;
  //   console.log(imagename);
  //   this.setState({imagename})
  // }
  render() {
    // console.log(this.props.imagename)
    return (
      <div className="Home">
        <h1>Upload a photo!</h1> 
          <form /*onSubmit={this.onFormSubmit}*/ action="/upload" enctype="multipart/form-data" method="POST" >
                <div className="section">Note: Only image files are allowed.</div>
                <div className="inner-wrap">
                  <label><input type="file" id="photo" name="photo" onChange={this.uploadFile} /></label>
                  <div className="button-section">
                    <input type="submit" name="Upload" value="Upload Photo"/>
                  </div>
                </div>
          </form>

            {/* {images.map((image) => <UploadedImage image={'/images/'+image.name} key={image.name}/> )} */}
      </div>
    );
  }
}

export default Home;
