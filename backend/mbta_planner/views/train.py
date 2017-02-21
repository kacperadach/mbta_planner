import re
from datetime import time, datetime
import json

from IPython.core.debugger import Tracer
import flask
from flask import request, abort, jsonify

from mbta_planner.models import TrainStop
from mbta_planner import constants as const
from mbta_planner.db import session
from mbta_planner.get_train import get_trains, get_train_stations

train_view = flask.Blueprint('train', __name__)

@train_view.route('/find', methods=['POST'])
def login():
    body = json.loads(request.data)
    for key in ('start', 'destination', 'time', 'day'):
        if key not in body.keys():
            abort(400, '{} not found in request body'.format(key))
        elif body[key] == '':
            abort(400, '{} not found in request body'.format(key))

    start = body['start']
    dest = body['destination']
    input_time = body['time']
    day = body['day']

    try:
    	t = datetime.strptime(input_time, '%I:%M %p')
    	t = time(hour=t.hour, minute=t.minute)
    except:
    	abort(400, 'invalid time supplied: {}'.format(input_time))

    train_responses = get_trains(start=start, dest=dest, input_time=t, day=day)
    train_responses = map(lambda x: x.get_dict(), train_responses)
    
    return jsonify(train_responses)


@train_view.route('/stations', methods=['GET'])
def stations():

    stations = []
    for t in get_train_stations():
        stations.append({'value': t, 'label': t})
    return jsonify(stations)