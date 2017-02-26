from IPython.core.debugger import Tracer

from mbta_planner.db import session
from mbta_planner.models import TrainSearch, User


def remove_duplicates(searches):
	filtered = []
	for s in searches:
		same = False
		for f in filtered:
			if f.is_equal(s):
				same = True
				break
		if not same:
			filtered.append(s)
			if len(filtered) == 3:
				break
	return filtered


def get_user_searches(id):
	searches = session.query(TrainSearch).filter_by(hide=False).outerjoin(User, User.ls_id == id).order_by(TrainSearch.datetime.desc()).all()
	searches = remove_duplicates(searches)
	searches = map(lambda x: x.get_dict(), searches)
	return searches
