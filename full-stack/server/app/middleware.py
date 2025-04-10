from flask import Flask, request, jsonify

def setup_middleware(app: Flask) -> None:
    """Setup the middleware with error handling and logging"""
    
    @app.before_request
    def before_request() -> None:
        """Middleware to handle any logic before the request is processed."""
        print(f"Incoming request: {request.method} {request.url}")

    @app.after_request
    def after_request(response) -> any:
        """Middleware to handle any logic after the request is processed."""
        print(f"Response status: {response.status}")
        return response

    @app.errorhandler(Exception)
    def handle_exception(error: Exception) -> any:
        """Catch all unhandled exceptions."""
        response = {
            "error": "Internal Server Error",
            "message": str(error)
        }
        print(response)
        return jsonify(response), 500

    @app.errorhandler(404)
    def handle_404_error(error: Exception) -> any:
        """Handle 404 errors."""
        response = {
            "error": "Not Found",
            "message": "The requested resource was not found."
        }
        print(response)
        return jsonify(response), 404
