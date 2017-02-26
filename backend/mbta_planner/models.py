import enum
from datetime import datetime

from flask.json import jsonify
from sqlalchemy import *
from sqlalchemy.orm import relationship, relation

from mbta_planner.base import Base
from mbta_planner.constants import TRAIN_ABBRS


class Timing(enum.Enum):
	weekday = 'Weekday'
	saturday = 'Saturday'
	sunday = 'Sunday'


class TrainResponse():

	def __init__(self, train, start, dest):
		self.train = train
		self.start = start
		self.dest = dest

	def get_dict(self):

		def get_serializable_time(t):
			return t.strftime('%I:%M %p')

		return {
			'train': {'train_number': self.train.train_number, 'train_line': TRAIN_ABBRS[self.train.line], 'timing': self.train.timing.name},
			'start': {'station': self.start.station, 'time': get_serializable_time(self.start.time)},
			'dest': {'station': self.dest.station, 'time': get_serializable_time(self.dest.time)}
		}


class TrainSearch(Base):
	__tablename__ = 'TrainSearch'

	id = Column(Integer, primary_key=True)
	start = Column(String(50))
	destination = Column(String(50))
	timing = Column(String(50))
	user_id = Column(Integer, ForeignKey('User.id'))
	datetime = Column(DateTime, default=datetime.utcnow)
	hide = Column(Boolean, default=False)

	def get_dict(self):

		return {
			'start': self.start,
			'destination': self.destination,
			'day': self.timing,
			'id': self.id
		}

	def is_equal(self, ts):
		return self.start == ts.start and self.destination == ts.destination and self.timing == ts.timing

class User(Base):
	__tablename__ = 'User'

	id = Column(Integer, primary_key=True)
	ls_id = Column(String(50))
	searches = relationship('TrainSearch', order_by="asc(TrainSearch.datetime)")


class Train(Base):
	__tablename__ = 'Train'

	id = Column(Integer, primary_key=True)
	train_number = Column(Integer)
	line = Column(String(50))
	timing = Column(Enum(Timing))


class TrainStop(Base):
	__tablename__ = 'TrainStop'

	id = Column(Integer, primary_key=True)
	train_id = Column(Integer, ForeignKey('Train.id'))
	station = Column(String(50))
	time = Column(Time)
	train = relationship('Train')


class TrainRide(Base):
	__tablename__ = 'TrainRide'

	id = Column(Integer, primary_key=True)
	name = Column(String(100))
	start_id = Column(Integer, ForeignKey('TrainStop.id'), nullable=False)
	dest_id = Column(Integer, ForeignKey('TrainStop.id'), nullable=False)
	start = relationship('TrainStop', foreign_keys=[start_id])
	dest = relationship('TrainStop', foreign_keys=[dest_id])

