from typing import Type, List, Dict, Any
from datetime import date
from ..database import db

class ModelRepository:
    @staticmethod
    def fetch_all(model: Type[db.Model]) -> List[Dict[str, Any]]:
        """Fetches all records from a given model and returns them as a JSON list."""
        records = model.query.all()
        return [ModelRepository.serialize(record) for record in records]

    @staticmethod
    def serialize(record: db.Model) -> Dict[str, Any]:
        """Converts a model instance into a dictionary."""
        return {
            column.name: getattr(record, column.name) if not isinstance(getattr(record, column.name), date) 
            else getattr(record, column.name).isoformat()
            for column in record.__table__.columns
        }

    @staticmethod
    def insert_record(model: Type[db.Model], data: Dict[str, Any]) -> Dict[str, Any]:
        """Inserts a new record into the database and returns the inserted record as JSON."""
        new_record = model(**data)
        db.session.add(new_record)
        db.session.commit()
        return ModelRepository.serialize(new_record)