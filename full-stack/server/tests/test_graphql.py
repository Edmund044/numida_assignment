import pytest
from flask import Flask
from flask_graphql import GraphQLView
from app import create_app
from app.schema import schema
from .models import loans, loan_payments

@pytest.fixture
def app() -> Flask:
    """Fixture to create and return the Flask app."""
    app = create_app()
    return app

@pytest.fixture
def client(app: Flask) -> any:
    """Fixture to create and return the test client."""
    return app.test_client()

def test_get_loans(client: any) -> None:
    """Test to fetch loans data with status."""
    query = """
    query {
        loans {
            id
            name
            interestRate
            principal
            dueDate
            status
            paymentDates
        }
    }
    """
    response = client.post(
        '/graphql',
        json={'query': query}
    )

    data = response.json
    assert response.status_code == 200
    assert 'data' in data
    assert 'loans' in data['data']
    assert isinstance(data['data']['loans'], list)  # Loans should be a list

    # Check if loan data is correct
    loan = data['data']['loans'][0]
    assert 'id' in loan
    assert 'name' in loan
    assert 'interestRate' in loan
    assert 'principal' in loan
    assert 'dueDate' in loan
    assert 'status' in loan  # status field should be included
    assert 'paymentDates' in loan
    assert isinstance(loan['paymentDates'], list)

def test_status_on_time(client: any) -> None:
    """Test loan status for 'On Time' payment"""
    loan_id = 1  # Example loan ID
    payment_date = datetime.date(2025, 2, 28)  # Example payment date within 5 days of due date
    loan = next(loan for loan in loans if loan["id"] == loan_id)
    
    query = """
    query {
        loans {
            id
            status
        }
    }
    """
    response = client.post(
        '/graphql',
        json={'query': query}
    )
    
    data = response.json
    assert response.status_code == 200
    loan_status = data['data']['loans'][0]['status']
    assert loan_status == "On Time"

def test_status_late(client: any) -> None:
    """Test loan status for 'Late' payment"""
    loan_id = 2  # Example loan ID
    payment_date = datetime.date(2025, 3, 20)  # Example payment date, late but within 30 days of due date
    loan = next(loan for loan in loans if loan["id"] == loan_id)

    query = """
    query {
        loans {
            id
            status
        }
    }
    """
    response = client.post(
        '/graphql',
        json={'query': query}
    )

    data = response.json
    assert response.status_code == 200
    loan_status = data['data']['loans'][1]['status']
    assert loan_status == "Late"

def test_status_defaulted(client: any) -> None:
    """Test loan status for 'Defaulted' payment"""
    loan_id = 3  # Example loan ID
    payment_date = datetime.date(2025, 4, 15)  # Example payment date, more than 30 days after due date
    loan = next(loan for loan in loans if loan["id"] == loan_id)

    query = """
    query {
        loans {
            id
            status
        }
    }
    """
    response = client.post(
        '/graphql',
        json={'query': query}
    )

    data = response.json
    assert response.status_code == 200
    loan_status = data['data']['loans'][2]['status']
    assert loan_status == "Defaulted"

def test_status_unpaid(client: any) -> None:
    """Test loan status for 'Unpaid' when no payment date exists"""
    loan_id = 4  # Example loan ID with no payments
    loan = next(loan for loan in loans if loan["id"] == loan_id)

    query = """
    query {
        loans {
            id
            status
        }
    }
    """
    response = client.post(
        '/graphql',
        json={'query': query}
    )

    data = response.json
    assert response.status_code == 200
    loan_status = data['data']['loans'][3]['status']
    assert loan_status == "Unpaid"

def test_graphql_error_handling(client: any) -> None:
    """Test error handling for an invalid query."""
    query = """
    query {
        invalidField {
            id
            amount
        }
    }
    """
    response = client.post(
        '/graphql',
        json={'query': query}
    )

    data = response.json
    assert response.status_code == 200
    assert 'errors' in data
    assert 'message' in data['errors'][0]
    assert 'invalidField' in data['errors'][0]['message']


def test_status_error_handling(client: any) -> None:
    """Test loan status for error handling"""
    # Simulate a scenario where the due date is incorrectly formatted
    loan_id = 1  # Example loan ID with incorrect due_date format (not a date object)
    loan = next(loan for loan in loans if loan["id"] == loan_id)
    loan["due_date"] = "Invalid Date"  # Set an invalid date string

    query = """
    query {
        loans {
            id
            status
        }
    }
    """
    response = client.post(
        '/graphql',
        json={'query': query}
    )
    
    data = response.json
    assert response.status_code == 200
    loan_status = data['data']['loans'][0]['status']
    assert loan_status == "Error"  # Should return "Error" because of the invalid due_date

def test_payment_dates_error_handling(client: any) -> None:
    """Test loan payment dates resolver for error handling"""
    # Simulate a scenario where payments can't be fetched correctly
    loan_id = 1  # Example loan ID with missing payment data
    # Removing the loan payments for the given loan ID to simulate error
    loan_payments[:] = [payment for payment in loan_payments if payment["loan_id"] != loan_id]

    query = """
    query {
        loans {
            id
            paymentDates
        }
    }
    """
    response = client.post(
        '/graphql',
        json={'query': query}
    )
    
    data = response.json
    assert response.status_code == 200
    payment_dates = data['data']['loans'][0]['paymentDates']
    assert payment_dates == ["Error fetching payment dates."]  # Should return error message
