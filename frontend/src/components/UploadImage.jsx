import { useState, useEffect } from "react";
import axios from 'axios'
import { BsFillCameraFill } from 'react-icons/bs'

document.body.style = 'background: #8da98b;';

export default function UploadImage() {
    const [state, setState] = useState({
        selectedImage: null,
        imageAsFile: null,
        imageResult: null

    })

    // useEffect(() => {
    //     document.querySelector("input[type='file']").value = ""
    // }, [state.selectedImage])

    // console.log('selectedFile', selectedFile)

    // green, black (landfill), yellow (clean paper), blue (recycle)

    const handleFileSelect = (event) => {
        // console.log(event.target.files[0])

        setState({
            selectedImage: URL.createObjectURL(event.target.files[0]),
            imageAsFile: event.target.files[0]
        });
    };

    const handleUpload = (event) => {
        event.preventDefault();

        const imageData = new FormData();
        imageData.append(
            "file_data",
            state.pictureAsFile
        );

        axios
            .post("http://localhost:5000/", imageData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setState(prev => ({ ...prev, imageResult: res.data }))
                document.querySelector("input[type='file']").value = "";
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="image-upload-cont">
            <div className="image-with-buttons">

                <div className="image-cont">
                    {state.selectedImage && (
                        <img
                            className="uploaded-image"
                            src={state.selectedImage}
                        />
                    )}
                </div>

                <form className="edit-form-upload" onSubmit={handleUpload}>
                    <label className="upload-label" for="inputTag">
                        <BsFillCameraFill />
                        <input
                            id="inputTag"
                            className="choose-image"
                            type="file"
                            name="image"
                            onChange={handleFileSelect}
                            accept="image/*"
                        />
                    </label>
                    <button
                        className="upload-image"
                        type="button"
                        onClick={handleUpload}
                    >
                        Upload Image
                    </button>
                </form>

            </div>
        </div>
    )
}