from flask import request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from sqlalchemy import Date
from functools import wraps
import jwt
from flask import current_app

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.Integer)
    username = db.Column(db.String(64), index=True, unique=True)
    password = db.Column(db.String(128))
    admin = db.Column(db.Boolean)

    def __repr__(self):
        return '<User {}>'.format(self.username)

class Visitor(db.Model):
    __tablename__ = 'visitor'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    company = db.Column(db.String(80), nullable=False)
    date = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User", backref=backref("user", uselist=False))

    def __init__(self, first_name, last_name, company, date):
        self.first_name = first_name
        self.last_name = last_name
        self.company = company
        self.date = date

    @property
    def serialize(self):
        return {f'id': self.id, 'first_name': self.first_name, 'last_name': self.last_name, 'company': self.company, 'date': self.date}
    
    def __repr__(self):
        return str({f'id': self.id, 'first_name': self.first_name, 'last_name': self.last_name, 'company': self.company, 'date': self.date})

#https://circleci.com/blog/authentication-decorators-flask/
def authorize(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        # pass jwt-token in headers
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token: # throw error if no token provided
            return make_response(jsonify({"message": "A valid token is missing!"}), 401)
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return make_response(jsonify({"message": "Invalid token!"}), 401)

        return f(current_user, *args, **kwargs)
    return decorator