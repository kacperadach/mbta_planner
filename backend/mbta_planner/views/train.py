import re
from datetime import time
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
    for key in ('start', 'destination', 'hour', 'minute', 'day'):
        if key not in body.keys():
            abort(400, '{} not found in request body'.format(key))
    start = body['start']
    dest = body['destination']
    hour = body['hour']
    minute = body['minute']
    day = body['day']

    try:
    	hour = int(hour)
    	minute = int(minute)
    	t = time(hour=hour, minute=minute)
    except:
    	abort(400, 'invalid time supplied: {}:{}'.format(hour, minute))

    train_responses = get_trains(start=start, dest=dest, input_time=t, day=day)
    train_responses = map(lambda x: x.get_dict(), train_responses)
    
    return jsonify(train_responses)


@train_view.route('/stations', methods=['GET'])
def stations():

    stations = []
    for t in get_train_stations():
        stations.append({'value': t, 'label': t})
    return jsonify(stations)