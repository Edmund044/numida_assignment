import graphene
from typing import List
from datetime import datetime, date
from .models.loan_payments import LoanPayments
from .models.loan import Loans
from .repository.model_repository import ModelRepository

class ExistingLoansWithPayments(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String()
    interest_rate = graphene.Float()
    principal = graphene.Float()
    due_date = graphene.String()
    status = graphene.String()
    payment_dates = graphene.String()

    def resolve_status(self, info) -> str:
        """Resolve the payment status based on the payment date and due date"""
        try:
            loan_payments = ModelRepository.fetch_all(LoanPayments)
            loans = ModelRepository.fetch_all(Loans)
            # Find the latest payment date for this loan
            payment_date = None
            for payment in loan_payments:
                for loan in loans:
                    if payment["loan_id"] == loan["id"]:
                        payment_date = payment["payment_date"]
                        due_date = loan["due_date"]
            
                    if payment_date is None:
                        return "Unpaid"

                    # Ensure that due_date and payment_date are valid date objects
                    if not isinstance(due_date, date):
                        raise ValueError("Invalid due date format.")

                    payment_diff = (payment_date - due_date).days

                    if payment_diff <= 5:
                        return "On Time"
                    elif 6 <= payment_diff <= 30:
                        return "Late"
                    elif payment_diff > 30:
                        return "Defaulted"
                    return "Unpaid"

        except ValueError as e:
            # Log or print the error
            print(f"Error in resolving status for loan: {str(e)}")
            return "Error"
        except Exception as e:
            # Catch any other unexpected errors
            print(f"Unexpected error in resolving status for loan : {str(e)}")
            return "Error"

    def resolve_payment_dates(self, info) -> List[str]:
        """Resolve the payment dates for a loan"""
        try:
            loan_payments = ModelRepository.fetch_all(LoanPayments)
            loans = ModelRepository.fetch_all(Loans)
            payment_dates = [str(payment["payment_date"]) for payment in loan_payments if payment["loan_id"] == self.id]
            if not payment_dates:
                return "No payments made."
            return payment_dates[0]

        except Exception as e:
            # Catch any other unexpected errors
            print(f"Unexpected error in resolving payment dates for loan : {str(e)}")
            return ["Error fetching payment dates."]


# Loan Payment Type
class LoanPaymentType(graphene.ObjectType):
    id = graphene.Int()
    loan_id = graphene.Int()
    payment_date = graphene.String()
    amount = graphene.Int()


class LoanItemType(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String()
    interest_rate = graphene.Float()
    principal = graphene.Float()
    due_date = graphene.String()

# Query class with proper type annotations
class Query(graphene.ObjectType):
    existing_loans_with_payments = graphene.List(ExistingLoansWithPayments)
    loans = graphene.List(LoanItemType)
    loan_payments = graphene.List(LoanPaymentType)
    

    def resolve_loan_payments(self, info) -> List[LoanPaymentType]:
        """Resolve loan payments"""
        try:
            loan_payments = ModelRepository.fetch_all(LoanPayments)
            if not loan_payments:
                print("No loan_payments found.")
            return [LoanPaymentType(**loan_payment) for loan_payment in loan_payments]
        except Exception as e:
            print(f"Error fetching loans: {str(e)}")


    def resolve_loans(self, info) -> List[LoanItemType]:
        """Resolve loans"""
        try:
            loans = ModelRepository.fetch_all(Loans)
            if not loans:
                print("No loans found.")
            return [LoanItemType(**loan) for loan in loans]
        except Exception as e:
            # raise graphene.GraphQLError(f"Error fetching loans: {str(e)}")
            print(f"Error fetching loans payments: {str(e)}")


    def resolve_existing_loans_with_payments(self, info) -> List[ExistingLoansWithPayments]:
        """Resolve loans and their repayments"""
        try:
            loans = ModelRepository.fetch_all(Loans)
            if not loans:
                print("No exisiting loans found.")
            return [ExistingLoansWithPayments(**loan) for loan in loans]
        except Exception as e:
            print(f"Error fetching loans and their payments: {str(e)}")
