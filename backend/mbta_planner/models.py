import enum

from sqlalchemy import *
from sqlalchemy.orm import relationship, relation

from mbta_planner.base import Base


class Timing(enum.Enum):
	weekday = 'Weekday'
	saturday = 'Saturday'
	sunday = 'Sunday'


class Train(Base):
	__tablename__ = 'Train'

	id = Column(Integer, primary_key=True)
	train_number = Column(Integer)
	line = Column(String(50))
	timing = Column(Enum(Timing))
	train_stops = relationship('TrainStop')


class TrainStop(Base):
	__tablename__ = 'TrainStop'

	id = Column(Integer, primary_key=True)
	train_id = Column(Integer, ForeignKey('Train.id'))
	station = Column(String(50))
	time = Column(Time)


class TrainRide(Base):
	__tablename__ = 'TrainRide'

	id = Column(Integer, primary_key=True)
	name = Column(String(100))
	start_id = Column(Integer, ForeignKey('TrainStop.id'), nullable=False)
	dest_id = Column(Integer, ForeignKey('TrainStop.id'), nullable=False)
	start_train = relationship('TrainStop', foreign_keys=[start_id])
	dest_train = relationship('TrainStop', foreign_keys=[dest_id])

