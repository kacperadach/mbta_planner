import os

import flask
from flask import jsonify

from mimprove.views.user import user_view
from mimprove.views.quiz import quiz_view
from mimprove.views.picture import picture_view
from mimprove.models.auth import InvalidCredentials
from mimprove.models.db_models import *

app = flask.Flask(__name__)
app.config['IMAGE_FILE_DIRECTORY'] = os.path.join(os.path.dirname(__file__), 'data')

app.register_blueprint(quiz_view, url_prefix="/quiz")
app.register_blueprint(picture_view, url_prefix="/picture")
app.register_blueprint(user_view, url_prefix="/user")

@app.route('/')
def main():
    return 'Memory Improvement'

# Registering handle for InvalidCredentials
@app.errorhandler(InvalidCredentials)
def handle_invalid_credentials(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

@app.errorhandler(400)
def custom400(error):
    response = jsonify({'message': error.description})
    return response, 400

@app.errorhandler(500)
def custom500(error):
    response = jsonify({'message': error.description})
    return response, 500


