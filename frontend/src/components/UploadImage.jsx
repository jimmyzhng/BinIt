import { useState, useEffect } from "react";
import axios from 'axios'
import Confetti from 'react-confetti';

export default function UploadImage() {
    const [state, setState] = useState({
        selectedImage: null,
        imageAsFile: null,
        submitted: false,
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
                state.submitted(true);
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
                {state.submitted && (
                  <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={100}
                    recycle={false}
                    gravity={0.5}
                    friction={0.1}
                    colors={['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722']}
                  />
                )}
            </form>
        </div>
    )
}