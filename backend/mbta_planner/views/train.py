import re
from datetime import time, datetime
import json

from IPython.core.debugger import Tracer
import flask
from flask import request, abort, jsonify

from mbta_planner.models import TrainStop, TrainSearch, User
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
    

    def update_searches(start, dest, day, body):
        if 'user_id' in body.keys():
            user_id = body['user_id'];
            user = session.query(User).filter_by(ls_id=user_id).first()
            if user:
                if day.lower() == 'today':
                    days = {
                        0: 'Monday',
                        1: 'Tuesday',
                        2: 'Wednesday',
                        3: 'Thursday',
                        4: 'Friday',
                        5: 'Saturday',
                        6: 'Sunday'
                    }
                    day = days[datetime.today().weekday()]
                ts = TrainSearch(start=start, destination=dest, timing=day, user_id=user.id)
                user.searches.append(ts)
                session.add_all((ts, user))
                session.commit()

    if len(train_responses) > 0 and 'again' not in body.keys():
        update_searches(start, dest, day, body)

    return jsonify(train_responses)


@train_view.route('/stations', methods=['GET'])
def stations():

    stations = []
    for t in get_train_stations():
        stations.append({'value': t, 'label': t})
    return jsonify(stations)


@train_view.route('/time', methods=['GET'])
def get_times():

    all_times = []
    for i in range(0, 24):
        for j in range(0, 60):
            all_times.append(time(hour=i, minute=j).strftime('%I:%M %p'))

    all_times = map(lambda x: x[1:] if x[0] == '0' else x, all_times)
    all_times = [{'value': x, 'label': x} for x in all_times]
    return jsonify(all_times)

