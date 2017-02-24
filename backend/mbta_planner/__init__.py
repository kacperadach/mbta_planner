import os

import flask
from flask import jsonify

from mbta_planner.views.train import train_view
from mbta_planner.views.user import user_view

app = flask.Flask(__name__)
app.config['IMAGE_FILE_DIRECTORY'] = os.path.join(os.path.dirname(__file__), 'data')

app.register_blueprint(train_view, url_prefix="/train")
app.register_blueprint(user_view, url_prefix="/user")

@app.route('/')
def main():
    return 'MBTA Planner'
