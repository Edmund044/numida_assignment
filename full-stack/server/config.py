import os

class Config:
    DEBUG: bool = True
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://trial-db_owner:u2DemFOhR4WL@ep-silent-wood-a5ndpfqn.us-east-2.aws.neon.tech/trial-db?sslmode=require")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
