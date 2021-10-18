import React, {useState, useEffect} from 'react';
import {singleFileUpload} from '../../../../api/index';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const FileUploadScreen = (props) => {

    const [singleFile, setSingleFile] = useState({
        originalname: '', type: '', size: '', fileParent: ''
    });
    const [singleProgress, setSingleProgress] = useState(0);

    const SingleFileChange = (e, fileParent) => {
        setSingleFile(e.target.files[0]);
        console.log(e.target.files[0]);
        setSingleFile({...singleFile,
            originalname: e.target.files[0].name,
            type: e.target.files[0].type,
            size: e.target.files[0].size,
            fileParent: fileParent});
        setSingleProgress(0);
    }

    const singleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setSingleProgress(percentage);
        }
    }

    const uploadSingleFile = async () => {
        const formData = new FormData();
        console.log('file', singleFile);
        formData.append('file', singleFile);
        await singleFileUpload(formData, singleFileOptions);
        props.getsingle();
    }

    return (
        <div className="row mt-3">
            <div className="col-6">
                <div className="form-group">
                    <label>Select Single File</label>
                    <input type="file" className="form-control" onChange={(e) => SingleFileChange(e, props.fileParent)} />
                </div>
                <div className="row">
                    <div className="col-10">
                        <button type="button" className="btn btn-danger" onClick={() => uploadSingleFile()} >Upload</button>
                    </div>
                    {/* <div className="col-2">
                        <CircularProgressbar
                            value={singleProgress}
                            text={`${singleProgress}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255, 136, 136, ${singleProgress / 100})`,
                                textColor: '#f88',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default FileUploadScreen;