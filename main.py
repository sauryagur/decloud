from flask import Flask, render_template, request, redirect, url_for, jsonify, flash, send_file
from flask_sqlalchemy import SQLAlchemy
import os
from werkzeug.utils import secure_filename
import io

# Initialize the app
app = Flask(__name__)

app.config['SECRET_KEY'] = os.urandom(24)  # Secret key for flash messages
# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///files.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'  # Folder to save files (though we won't save to disk here)
app.config['ALLOWED_EXTENSIONS'] = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

# Initialize the database
db = SQLAlchemy(app)

# Define the File model
class File(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(120), nullable=False)
    file_data = db.Column(db.LargeBinary, nullable=False)  # BLOB field for file data

# Create the database (if not already created)
with app.app_context():
    db.create_all()

# Define routes
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/explorer')
def explorer():
    # Fetch all file metadata from the database
    files = File.query.all()
    return render_template('explorer.html', files=files)

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part', 'danger')  # Flash an error message
            return redirect(request.url)

        files = request.files.getlist('file')  # Handle multiple file uploads

        if not files:
            flash('No file selected', 'danger')  # Flash an error message if no files are selected
            return redirect(request.url)

        uploaded_files = []  # To store successfully uploaded files

        for file in files:
            if file and file.filename != '':
                if allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    file_data = file.read()  # Read the file data as binary

                    # Store the file data in the database
                    new_file = File(filename=filename, file_data=file_data)
                    db.session.add(new_file)
                    uploaded_files.append(filename)
                else:
                    flash(f"File type not allowed: {file.filename}", 'danger')  # Flash an error if file type is not allowed

        # Commit changes to the database if files were successfully uploaded
        if uploaded_files:
            db.session.commit()
            flash(f"Files uploaded successfully: {', '.join(uploaded_files)}", 'success')
        else:
            flash('No valid files were uploaded', 'danger')

        # Redirect to the explorer page after uploading
        return redirect(url_for('explorer'))

    return render_template('upload.html')


@app.route('/pricing')
def pricing():
    return render_template('pricing.html')

# Helper function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route("/basicUploader")
def nej():
    return render_template("basicUploader.html")

@app.route("/basicDownloader")
def nej2():
    return render_template("basicDownloader.html")

# Route to serve the uploaded file for download
@app.route('/download/<int:file_id>')
def download(file_id):
    # Fetch the file from the database by its ID
    file = File.query.get_or_404(file_id)
    
    # Create an in-memory binary stream from the file data
    return send_file(io.BytesIO(file.file_data), as_attachment=True, download_name=file.filename)

# New route to return file names in JSON format
@app.route('/filesInfo', methods=['GET'])
def files_json():
    # Fetch all file metadata from the database
    files = File.query.all()
    filenames = [file.filename for file in files]
    return jsonify(filenames)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
