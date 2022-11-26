from flask import Blueprint, request
from model.models import Visitor, authorize
from model.models import db
import datetime

api = Blueprint('api', __name__, url_prefix='/api')


@api.route('/')
@authorize
def hello_world():
    return 'Hello World!'


@api.route('/list', methods=['GET'])
def list():
    return [v.serialize for v in Visitor.query.all()]


@api.route('/get/<int:id>', methods=['GET'])
def get(id):
    try:
        v = Visitor.query.get(id)
    except Exception as e:
        return '', 404
    return v.serialize


@api.route('/add', methods=['POST'])
def add():
    try:
        data = request.json
        v = Visitor(data.get('first_name'), data.get('last_name'), data.get(
            'company'), datetime.datetime.strptime(data.get('date'), "%Y-%m-%d").date())
        db.session.add(v)
        db.session.commit()
    except Exception as e:
        return '', 404
    return v.serialize, 200


@api.route('/update/<int:id>', methods=['POST'])
def update(id):
    try:
        data = request.json
        v = Visitor.query.get(id)
        v.first_name = data.get('first_name')
        v.last_name = data.get('last_name')
        v.company = data.get('company')
        v.date = datetime.datetime.strptime(data.get('date'), "%Y-%m-%d").date()
        db.session.commit()
    except Exception as e:
        return '', 404
    return v.serialize, 200


@api.route('/delete/<int:_id>', methods=['POST'])
def delete(_id):
    try:
        Visitor.query.filter_by(id=_id).delete()
        db.session.commit()
    except Exception as e:
        return '', 404
    return '', 200


@api.route('/search/<string:query>', methods=['GET'])
def search(query):
    all = []
    for v in Visitor.query.all():
        if query in v.first_name or query in v.last_name or query in v.company or query in v.date:
            all.append(v.serialize)
    return all, 200
