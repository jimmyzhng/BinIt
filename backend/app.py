from flask import Flask, request
from flask_cors import CORS
from obj_detect import trash_detect
import base64
import numpy as np

app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/", methods=["GET", "POST"])
def trash_class():
    req = request.get_json("image")
    req = req.split(',')[1]
    img_data = base64.b64decode(req)
    image_np = np.fromstring(img_data, dtype=np.uint8)

    with open('imageToSave.jpg', "wb") as fh:
        fh.write(image_np)

    return trash_detect('imageToSave.jpg')

if __name__ == "__main__":
    app.run(debug=True)