import re
from datetime import time, datetime
import json

from IPython.core.debugger import Tracer
import flask
from flask import request, abort, jsonify

from mbta_planner.models import TrainStop, TrainSearch, User
from mbta_planner import constants as const
from mbta_planner.db import session

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
	searches = session.query(TrainSearch).outerjoin(User, User.ls_id == id).all()[0:3]
	searches = map(lambda x: x.get_dict(), searches)

	return jsonify(searches)
