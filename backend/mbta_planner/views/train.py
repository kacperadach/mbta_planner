import re
from datetime import time

from IPython.core.debugger import Tracer
import flask
from flask import request, abort, jsonify

from mbta_planner.models import TrainStop
from mbta_planner import constants as const
from mbta_planner.db import session
from mbta_planner.get_train import get_trains

train_view = flask.Blueprint('train', __name__)

@train_view.route('/find', methods=['POST'])
def login():
    for key in ('start', 'dest', 'hour', 'minute', 'day'):
        if key not in request.form.keys():
            abort(400, '{} not found in request body'.format(key))
    start = request.form['start']
    dest = request.form['dest']
    hour = request.form['hour']
    minute = request.form['minute']
    day = request.form['day']

    try:
    	hour = int(hour)
    	minute = int(minute)
    	t = time(hour=hour, minute=minute)
    except:
    	abort(400, 'invalid time supplied: {}:{}'.format(hour, minute))

    
    train_responses = get_trains(start=start, dest=dest, input_time=t, day=day)
    train_responses = map(lambda x: x.get_dict(), train_responses)
    
    return jsonify(train_responses)


@train_view.route('/test', methods=['GET'])
def test():
    return jsonify('test')