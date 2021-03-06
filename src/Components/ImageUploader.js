import React, {Component} from 'react'
import ReactS3Uploader from 'react-s3-uploader'
import axios from 'axios'

export default class ImageUploader extends Component {
    onProgress = (percentage) => {
        //TODO: Provide user feedback down the line notifying them of the current progress
    }

    onFinish = (fileDetails) => {
        let {filename} = fileDetails 
        let {type, updateMainProjectImageUrl, stateProperty} = this.props
        let apiPath;
        switch(type) {
            case 'studentPicture': 
                apiPath =  '/api/students/updatePicture';
                this.sendToBackend(apiPath, filename)
                break;
            case 'mainProjectImage':
                updateMainProjectImageUrl(filename, stateProperty)
                break;
            default:
                break;
        }
    }

    sendToBackend = (apiPath, filename) => {
        axios.put(apiPath, {pictureUrl: filename}).then( res => {
            this.props.resetStudentData(res.data)
        }) 
    }

    render() {
        return (
            <ReactS3Uploader
                signingUrl="/s3/sign"
                signingUrlMethod="GET"
                accept="image/*"
                s3path="pictures/"
                preprocess={this.onUploadStart}
                onSignedUrl={this.onSignedUrl}
                onProgress={this.onProgress}
                onError={this.onUploadError}
                onFinish={this.onFinish}
                signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
                uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
                contentDisposition="auto"
                scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
                inputRef={cmp => this.uploadInput = cmp}
                autoUpload={true}
            />
        )
    }
}