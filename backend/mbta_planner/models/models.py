from sqlalchemy import *
from sqlalchemy.orm import relationship

from mbta_planner.base import Base

class User(Base):
    __tablename__ = 'user'
    
    user_id = Column(Integer, primary_key = True)
    username = Column(String(30))
    password_hash = Column(String(60))
    first_name = Column(String(30))
    last_name = Column(String(30))
    dob = Column(DateTime)
    gender = Column(Integer)
    phone_num = Column(String(11))
