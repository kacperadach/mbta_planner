from datetime import time, datetime
import sys
from os import path

from IPython.core.debugger import Tracer
sys.path.append(path.dirname(path.abspath(__file__).rsplit('/', 1)[0]))

from sqlalchemy import and_

from mbta_planner.models import Train, TrainStop, TrainRide, TrainResponse
from mbta_planner.db import session


def get_time(input_time):
	if isinstance(input_time, time):
		return input_time
	else:
		now = datetime.now()
		return time(hour=now.hour, minute=now.minute)
	

def get_day_str(day):
	if day.lower() == 'today':
		week_num = datetime.today().weekday()
		if week_num < 5:
			return 'Weekday'
		elif week_num == 5:
			return 'Saturday'
		else:
			return 'Sunday'
	elif day.lower() in ('monday', 'tuesday', 'wednesday', 'thursday', 'friday'):
		return 'Weekday'
	elif day.lower() == 'saturday':
		return 'Saturday'
	else:
		return 'Sunday'


def get_trains(start, dest, input_time, day):
	name = start.replace(' ', '') + ':' + dest.replace(' ', '')
	day = get_day_str(day)
	input_time = get_time(input_time)
	TrainRides = session.query(TrainRide).filter_by(name=name).outerjoin(TrainStop, TrainRide.start_id==TrainStop.id).outerjoin(Train).filter(Train.timing==day)
	TrainRides = TrainRides.all()
	Tracer()()

	if len(TrainRides) >= 3:
		TrainRides = TrainRides[0:3]
	elif len(TrainRides) > 0:
		TrainRides = TrainRides[0:len(TrainRides)]
	else:
		return []

	train_responses = []
	for tr in TrainRides:
		train_response = TrainResponse(train=tr.start.train, start=tr.start, dest=tr.dest)
		train_responses.append(train_response)

	return train_responses
