from ..database import db
class LoanPayments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    loan_id = db.Column(db.Integer, db.ForeignKey("loans.id"), nullable=False)
    payment_date = db.Column(db.Date, nullable=False)
    amount = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"<LoanPayment LoanID: {self.loan_id}, Date: {self.payment_date}>"
