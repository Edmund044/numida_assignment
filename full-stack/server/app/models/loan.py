from ..database import db

class Loans(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    interest_rate = db.Column(db.Float, nullable=False)
    principal = db.Column(db.Float, nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    months = db.Column(db.Float, nullable=False)

    payments = db.relationship("LoanPayments", backref="loans", lazy=True)

    def __repr__(self):
        return f"<Loan {self.name}>"
