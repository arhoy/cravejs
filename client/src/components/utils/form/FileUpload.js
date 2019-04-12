import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const maxFileSize = 1000000; // max size in bytes. ~ 10 megabyte.
class FileUpload extends Component {

    state = {
        uploadedFiles:[],
        uploading:false
    }

    handleOnDrop = ( files,rejectedFiles ) => {
        if(files && files.length > 0) {
            let formData = new FormData();
            formData.append("file",files[0]);
            axios.post('/api/users/uploadimage',formData)
                .then( response => {
                    this.setState({
                        uploading:false,
                        uploadedFiles:[
                            ...this.state.uploadedFiles,
                            response.data
                        ]
                    })
                // save this into the resume database.
                })
                .catch ( err => console.log('there was an error with upload'))
        }
        if(rejectedFiles && rejectedFiles.length > 0){
            if(rejectedFiles[0].size > maxFileSize){
                alert('File is to big!');
            }
            else {
                alert('Upload must be an image!');
            }
        }
       
    }


    render() {
        const { uploadedFiles } = this.state;
        return (
            <div className = "fileupload" >
                        
                     
                    <div className="fileupload__drag">
                            <Dropzone
                                onDrop = { this.handleOnDrop }
                                maxSize = {maxFileSize}
                                className = "fileupload__dropzone"
                                multiple = {this.props.multiple}
                                accept = "image/*" // accept all images
                               
                            >
                                <FontAwesomeIcon
                                        icon="plus-circle"
                                        style = {{color:'black', cursor:'pointer',fontSize: '4.5rem'}}
                                />
                                <p> drag and drop file </p>
                             
                            </Dropzone>

                           
                    </div>
                    
                    <div className = "fileupload__show">
                            {
                                    uploadedFiles.length > 0 ?
                                            <div className = "fileupload__imagesContainer">
                                            {
                                                uploadedFiles.map( file => (
                                                    <div className = "fileupload__images"
                                                        key = {file.public_id}
                                                    >
                                                        <img src={file.url} alt="Uploaded File"/>
                                                    </div>
                                                ))
                                            }
                                            </div>
                                        
                                            : null
                            }
                    </div>

                    

                     
                       
                
            </div>
        );
    }
}

FileUpload.defaultProps = {
    multiple: false
  };

export default FileUpload;

