from flask import jsonify, request
from flask_graphql import GraphQLView
from .schema import schema
import datetime
from flask import Flask
from .repository.model_repository import ModelRepository
from .models.loan_payments import LoanPayments
import datetime

def configure_graphql(app: Flask) -> None:
    """Configure the GraphQL endpoint."""
    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
    )

def register_routes(app):
    @app.route("/api/loan_payments", methods=["POST"])
    def add_loan_payment():
        try:
            data = request.get_json()
            loan_id = data.get("loan_id")
            amount = data.get("amount")

            # Validate inputs
            if not all([loan_id, amount]):
                return jsonify({"success": False, "message": "Missing required fields"}), 400

            # payment_date = datetime.datetime.

            new_payment = {
                "loan_id": loan_id,
                "amount": amount,
                "payment_date": datetime.date.today()
            }

            ModelRepository.insert_record(LoanPayments,new_payment)

            return jsonify({"success": True, "message": "Payment added successfully", "payment": new_payment}), 201

        except Exception as e:
            return jsonify({"success": False, "message": f"Error: {str(e)}"}), 500