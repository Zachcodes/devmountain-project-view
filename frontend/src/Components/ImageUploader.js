import React, {Component} from 'react'
import ReactS3Uploader from 'react-s3-uploader'


const config = {
    bucketName: process.env.REACT_APP_BUCKET,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_S3_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
}

export default class ImageUploader extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <ReactS3Uploader
                    signingUrl="/s3/sign"
                    signingUrlMethod="GET"
                    accept="image/*"
                    s3path="/uploads/"
                    preprocess={this.onUploadStart}
                    onSignedUrl={this.onSignedUrl}
                    onProgress={this.onUploadProgress}
                    onError={this.onUploadError}
                    onFinish={this.onUploadFinish}
                    signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
                    uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
                    contentDisposition="auto"
                    scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
                    inputRef={cmp => this.uploadInput = cmp}
                    autoUpload={true}
                />
            </div>
        )
    }
}