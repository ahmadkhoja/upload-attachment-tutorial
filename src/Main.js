import  React from 'react'

export default class Main extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {

      };      
    }
  
        render() {
      return (
        <div>
              <form action='http://localhost:3000/upload' 
                    method='post' 
                    encType="multipart/form-data">
                <input type="file" name="sampleFile" />
                <input type='submit' value='Upload!' />
              </form>   
        </div>
      );
    }
  }