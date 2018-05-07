import React from 'react';
import logo from './react.svg';
import './Home.css';
import Main from './Main'
import FileField from './FileField'


 const UploadedImage = ({image}) => {
    return (
      <div>
        <img src={image} width="100px" height="100px"/> <br/>
      </div>
    )
}
export class UploadedImages extends React.Component{
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
    fetch('/upload')
      .then(response=>response.json())
      .then(response=>this.setState({images:response.images,/*loading_progress:'success'*/}))
      .catch(err => this.setState({/*loading_progress:'error',*/ message:err.message}))
    console.log(this.state.images,'yes from here you bakka')
  }
  onChange = (event) => {
    let imagename = event.target.files[0].name;
    console.log(imagename);
    this.setState({imagename})
  }
  uploadImage = (event) => {
    // event.preventDefault()
    // get the form data
    fetch('/upload')
      .then( () => this.loadImages())
      .catch(err => this.setState({ /*loading_progress: 'error',*/ message:err.message}))
  }
  render(){
  //   const { loading_progress } = this.state
  //   if(loading_progress === 'loading'){
  //       return <div>...loading...</div>
  //   }
  //  else if(loading_progress === 'error'){
  //     return <div>{this.state.message}</div>
  //  }
  return(
      <div className="uploadForm">
        <h1>Upload a photo!</h1> 
        <form onSubmit={this.uploadImage} action="/upload" enctype="multipart/form-data" method="POST" >
              <div class="section">Note: Only image files are allowed.</div>
              <div class="inner-wrap">
                <label><input type="file" id="photo" name="photo" onChange={this.onChange}/></label>
                <div class="button-section">
                  <input type="submit" name="Upload" value="Upload Photo"/>
                </div>
              </div>
        </form>
        {this.state.images.map( (image)=> <UploadedImage image={'/images/'+image.name} key={image.name}/>)}
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
                <div class="section">Note: Only image files are allowed.</div>
                <div class="inner-wrap">
                  <label><input type="file" id="photo" name="photo" onChange={this.uploadFile} /></label>
                  <div class="button-section">
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
