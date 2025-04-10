from flask import Flask
from flask_graphql import GraphQLView
from .schema import schema
from .middleware import setup_middleware
from .views import configure_graphql,register_routes
from flask_cors import CORS
from config import Config
from .database import db

def create_app() -> Flask:
    app: Flask = Flask(__name__)

    # Setup middleware (before_request, after_request, error handling)
    setup_middleware(app)

    # Configure GraphQL view
    configure_graphql(app)

    #configure REST API
    register_routes(app)

    #CORS configuration
    CORS(app)

    #Add configuration
    app.config.from_object(Config)

    #Initialize database
    db.init_app(app)

    #Create tables
    with app.app_context():
      db.create_all()

    return app

