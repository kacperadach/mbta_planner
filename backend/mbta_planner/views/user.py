import re
from datetime import time

from IPython.core.debugger import Tracer
import flask
from flask import request, abort, jsonify

from mbta_planner.models import TrainStop
from mbta_planner import constants as const
from mbta_planner.db import session

user_view = flask.Blueprint('user', __name__)

@user_view.route('/login', methods=['GET'])
def login():
   ts1 = TrainStop(station='first', time=time(hour=1))
   ts2 = TrainStop(station='second', time=time(hour=1))
   ts3 = TrainStop(station='third', time=time(hour=1))
   ts1.future_stops.append(ts2)
   ts1.future_stops.append(ts3)
   ts2.future_stops.append(ts3)
   session.add_all((ts1, ts2, ts3))
   session.commit()


@user_view.route('/check', methods=['GET'])
def register():
   ts1 = session.query(TrainStop).filter_by(station='first')
   Tracer()()

