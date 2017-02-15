import re
from datetime import date

import flask
from flask import request, abort, jsonify

from mbta_planner.models.db_models import User
from mbta_planner import constants as const
from mbta_planner.db import session

user_view = flask.Blueprint('user', __name__)

@user_view.route('/login', methods=['POST'])
def login():
    """
    Log in a user.
    If successful, return a message and error otherwise.

    URL: /user/login

    POST Parameters:
    - username
    - password

    Return: json {'message':'success'} on success. On failure, return HTTP 403.
    """
    username = request.form['username']
    password = request.form['password']

    if not username:
        abort(403, 'Null Username')
    elif not password:
        abort(403, 'Null Password')

    user_exists = session.query(User).filter_by(username=username).first()
    if user_exists:
        if check_password(password, user_exists.password_hash):
            return jsonify('User Login Validated')
        else:
            abort(403, 'Wrong Password')
    abort(403, 'Username does not exist')



@user_view.route('/register', methods=['POST'])
def register():
    """
    Register a user.

    If successful, return a message; error otherwise.

    URL: /user/register

    POST Parameters:
    - username
    - password
    - firstname
    - lastname
    - dob
    - gender

    Return: json on success. On failure, return failure message.
    """
    for key in ('username', 'password', 'firstname', 'lastname', 'dob', 'gender', 'phone'):
        if key not in request.form.keys():
            abort(400, '{} not found in request body'.format(key))

    username = request.form['username']
    password = request.form['password']
    firstname = request.form['firstname']
    lastname = request.form['lastname']
    dob = request.form['dob']
    gender = request.form['gender']
    phone_num = request.form['phone']

    fail_validation = _validate_input(username, password, firstname, lastname, dob, gender, phone_num)
    if fail_validation:
        message = 'Invalid Request Parameters:\n'
        for reason in fail_validation:
            message += (reason[0] + ' ' + reason[1] + '\n')
        abort(400, message)

    split = dob.split('-')
    dob = date(year=int(split[0]), month=int(split[1]), day=int(split[2]))

    user_exists = session.query(User).filter_by(username=username).first()
    if user_exists:
        abort(400, 'username already in use')
    else:
        new_user = User(
            username=username,
            password_hash=generate_password_hash(password.encode('utf-8')),
            first_name=firstname,
            last_name=lastname,
            dob=dob,
            gender=int(gender),
            phone_num=phone_num
        )
        session.add(new_user)
        session.commit()
        return jsonify('User Created')

def _validate_input(username, password, firstname, lastname, dob, gender, phone):
    """
    Validates that user input is valid:
    -Gender must be one of {'M', 'F', 'U'}
    -Date of Birth must fall between 1001-01-01 and 9999-12-31 in YYYY-MM-DD format
    -All other values are permitted to be any non-empty instance of a string (handle encoding later)

    :return: A list of 2-tuples indicating invalid input fields and their message
    """
    messages = []

    # DOB validation
    try:
        parsed_dob = dob.split('-')
        year = int(parsed_dob[0])
        month = int(parsed_dob[1])
        day = int(parsed_dob[2])
        if year < 1001 or year > 9999:
            messages.append(('dob', 'Invalid Input: DOB: year: %d' % year))
        if month < 1 or month > 12:
            messages.append(('dob', 'Invalid Input: DOB: month: %d' % month))
        if day < 1 or day > 31:
            messages.append(('dob', 'Invalid Input: DOB: day: %d' % day))
    except (ValueError, IndexError):
        messages.append(('dob', 'Invalid Input: DOB: ' + dob))

    # Gender Validation
    try:
        gender = int(gender)
        if gender not in const.GENDER_OPTIONS:
            messages.append(('gender', 'Invalid Input: Gender: {}'.format(gender)))
    except ValueError:
        messages.append(('gender', 'Invalid Input: Gender: {}'.format(gender)))

    # Phone number validation
    if not re.match(r'^\d{10,11}$', phone):
        messages.append(('phone', 'Invalid Input: Phone: %s' % phone))

    # Validate the rest
    to_validate = {'username': username, 'password': password, 'firstname': firstname, 'lastname': lastname}
    for name, value in to_validate.items():
        if not value or not isinstance(value, basestring):
            messages.append((name, 'Invalid Input: %s must not be blank' % name))

    return messages
