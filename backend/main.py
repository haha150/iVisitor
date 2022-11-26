import os
from flask import Flask
from flask_cors import CORS
from config import app_config
from model.models import db
from blueprints.api import api as api_endpoints
from blueprints.auth import auth as auth_endpoints

#config_name = os.getenv('FLASK_ENV', 'prod')
config_name = os.getenv('FLASK_ENV', 'test')

app = Flask(__name__)
CORS(app)
app.config.from_object(app_config[config_name])
db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(api_endpoints)
app.register_blueprint(auth_endpoints)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)