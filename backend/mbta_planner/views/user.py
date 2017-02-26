import re
from datetime import time, datetime
import json

from IPython.core.debugger import Tracer
import flask
from flask import request, abort, jsonify

from mbta_planner.models import TrainStop, TrainSearch, User
from mbta_planner import constants as const
from mbta_planner.db import session
from mbta_planner.get_searches import get_user_searches

user_view = flask.Blueprint('user', __name__)

@user_view.route('/register', methods=['POST'])
def register():
	body = json.loads(request.data)

	for key in ('id',):
		if key not in body.keys():
			abort(400, '{} not found in request body'.format(key))
		elif body[key] == '':
			abort(400, '{} not found in request body'.format(key))
			
	id = body['id']

	user = session.query(User).filter_by(ls_id=id).first()
	if user:
		return jsonify('User Exists')
	else:
		user = User(ls_id=id)
		session.add(user)
		session.commit()
		return jsonify('User Created')


@user_view.route('/searches', methods=['POST'])
def get_searches():
	body = json.loads(request.data)

	for key in ('id',):
		if key not in body.keys():
			abort(400, '{} not found in request body'.format(key))
		elif body[key] == '':
			abort(400, '{} not found in request body'.format(key))

	id = body['id']
	searches = get_user_searches(id)
	# searches = session.query(TrainSearch).filter_by(hide=False).outerjoin(User, User.ls_id == id).order_by(TrainSearch.datetime.desc()).all()

	# def remove_duplicates(searches):
	# 	filtered = []
	# 	for s in searches:
	# 		same = False
	# 		for f in filtered:
	# 			if f.is_equal(s):
	# 				same = True
	# 				break
	# 		if not same:
	# 			filtered.append(s)
	# 			if len(filtered) == 3:
	# 				break
	# 	return filtered

	# searches = remove_duplicates(searches)
	# searches = map(lambda x: x.get_dict(), searches)
	return jsonify(searches)


@user_view.route('/searches/delete', methods=['POST'])
def delete_search():
	body = json.loads(request.data)

	for key in ('searchId',):
		if key not in body.keys():
			abort(400, '{} not found in request body'.format(key))
		elif body[key] == '':
			abort(400, '{} not found in request body'.format(key))

	search_id = body['searchId']
	search = session.query(TrainSearch).filter_by(id=search_id).first()
	searches = []
	if search:
		search.hide = True
		session.add(search)
		user = session.query(User).filter_by(id=search.user_id).first()
		searches = get_user_searches(user.ls_id)
		session.commit()

	return jsonify(searches)