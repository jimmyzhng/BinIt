from flask import Flask, request
from flask_cors import CORS
from obj_detect import trash_detect

app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/trashclass", methods=["POST"])
def trash_class():

    file = request.files['file_data']
    if allowed_file(file):
        return trash_detect(file)

    return "No Object Detected!"

if __name__ == "__main__":
    app.run(debug=True)