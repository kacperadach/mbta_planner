import pickle
from os import path, listdir
from datetime import time

from IPython.core.debugger import Tracer
import numpy as np

from mbta_planner.models import Train, TrainStop, TrainRide, Timing
from mbta_planner.db import session


INVALID_TABLE_STRS = ('VIA', 'HAV', 'LOW', 'FAIR', 'LINE')

class TrainStopIdGenerator():

	def __init__(self):
		self.id = 0

	def next(self):
		self.id += 1
		return self.id

TSIG = TrainStopIdGenerator()

def get_pickles_directory_path():
	current_path = path.dirname(path.abspath(__file__))
	pickle_path = path.join(current_path.rsplit('/', 1)[0], 'pickles')
	return pickle_path


def get_line_and_timing_from_file(file_name):
	split = file_name.rsplit('.')[0].split('-')
	return split[0], split[2]


def get_24hour_time(am_or_pm, first_time, hour, minute):
	hour = int(hour)
	minute = int(minute)
	if hour >= first_time.hour and hour != 12:
		if am_or_pm == 'AM':
			return time(hour=hour, minute=minute)
		else:
			return time(hour=hour+12, minute=minute)
	elif hour < first_time.hour and first_time.hour !=12:
		if am_or_pm == 'AM':
			return time(hour=hour+12, minute=minute)
		else:
			return time(hour=hour, minute=minute)
	elif hour > first_time.hour and hour == 12:
		if am_or_pm == 'AM':
			return time(hour=12, minute=minute)
		else:
			return time(hour=0, minute=minute)
	elif hour == first_time.hour and hour == 12:
		if am_or_pm == 'AM':
			return time(hour=0, minute=minute)
		else:
			return time(hour=12, minute=minute)
	elif hour < first_time.hour and first_time.hour == 12:
		if am_or_pm == 'AM':
			return time(hour=hour, minute=minute)
		else:
			return time(hour=hour+12, minute=minute)
	raise AssertionError

def map_train_table(train_table, line, timing):
	all_objects = []
	stations = train_table[:,0]
	for x in range(1, train_table.shape[1]):
		col = train_table[:,x]
		train = Train(
			train_number=int(col[0].split('\n')[0]),
			line=line,
			timing=timing
		)
		all_objects.append(train)
		am_or_pm = col[0].split('\n')[1]

		all_stops = []
		first_time = None
		for ts in col[1:]:
			if ts.strip() != '' and ts not in INVALID_TABLE_STRS:
				try:
					hour, minute = ts.strip('F').split(':')
					if not first_time:
						first_time = time(int(hour), int(minute))
				except:
					Tracer()()
			else:
				continue
			t = get_24hour_time(am_or_pm, first_time, hour, minute)

			train_stop = TrainStop(
				id=TSIG.next(),
				station=stations[np.where(col == ts)[0][0]],
				time=t,
				train=train
			)
			all_stops.append(train_stop)
			all_objects.append(train_stop)

		for start in all_stops:
			for dest in all_stops[all_stops.index(start)+1:]:
				name = start.station.replace(' ', '') + ':' + dest.station.replace(' ', '')
				train_ride = TrainRide(
					name=name,
					start_id=start.id,
					dest_id=dest.id
				)
				all_objects.append(train_ride)
	session.add_all(all_objects)
	session.commit()


def map_pickles():
	pickle_dir = get_pickles_directory_path()
	all_files = listdir(pickle_dir)
	for f in all_files:
		print f
		line, timing = get_line_and_timing_from_file(f)
		timing = getattr(Timing, timing)
		train_table = np.array(pickle.load(open(path.join(pickle_dir, f), 'rb')))
		map_train_table(train_table, line, timing)


if __name__ == '__main__':
	map_pickles()

