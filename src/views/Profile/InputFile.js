import React from 'react';

class InputFile extends React.Component {
  state = {
    fileName: '',
    fileNameWeb: '',
    file: null,
  };

  onChange = (evt) => {
    const inputFile = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileName = inputFile.name; 

      const f = e.target.result.split(',');
      const fileNameWeb = f[0];
      const file =f[1];
      
      this.setState({fileName, file, fileNameWeb});
      
      //Propagate up
      this.props.onChange({ fileName, file, fileNameWeb });
    };
    reader.readAsDataURL(inputFile);
  }

  render() {
    return (
      <div>
        <input type='file'
               onChange={this.onChange}
        />
      </div>
    );
  }
}

export default InputFile;