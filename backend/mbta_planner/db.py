from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from mbta_planner.base import Base
from mbta_planner.constants import *

SQLALCHEMY_DATABASE_URI = 'mysql://{}:{}@{}/{}'.format(MYSQL_USER, MYSQL_PASSWD, MYSQL_HOST, MYSQL_DB)

engine = create_engine(SQLALCHEMY_DATABASE_URI)
Base.metadata.create_all(engine, checkfirst=True)
Session = sessionmaker(bind=engine)
session = Session()
