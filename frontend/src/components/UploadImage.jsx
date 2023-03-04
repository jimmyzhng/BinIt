import { useState, useEffect } from "react";
import axios from 'axios'

export default function UploadImage() {
    const [state, setState] = useState({
        selectedImage: null,
        imageAsFile: null,
    })

    // console.log('selectedFile', selectedFile)

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
                document.querySelector("input[type='file']").value = "";
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            {state.selectedImage && (
                <img
                    className="profile-image"
                    src={state.selectedImage}
                    width="500"
                    height="500"
                />
            )}

            <form className="edit-form-upload" onSubmit={handleUpload}>
                <input
                    className="choose-image"
                    type="file"
                    name="image"
                    onChange={handleFileSelect}
                    accept="image/*"
                />
                <button
                    className="profile-button upload"
                    type="button"
                    onClick={handleUpload}
                >
                    Upload Image
                </button>
            </form>
        </div>
    )
}