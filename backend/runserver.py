#!/usr/bin/python
from mbta_planner import app

application = app

if __name__ == '__main__':
	application.debug = True
	application.run()
