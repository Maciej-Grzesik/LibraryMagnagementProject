package org.library.backend.Service.exceptions;

/**
 * ErrorResponse represents an error response containing status code and message
 */
public class ErrorResponse {
    private int statusCode;
    private String message;

    /**
     * Constructs an ErrorResponse with the specified status code and message
     *
     * @param statusCode the HTTP status code
     * @param message    the error message
     */
    public ErrorResponse(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    /**
     * Retrieves the status code of the error response
     *
     * @return the status code
     */
    public int getStatusCode() {
        return statusCode;
    }

    /**
     * Sets the status code of the error response
     *
     * @param statusCode the status code to set
     */
    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    /**
     * Retrieves the message of the error response
     *
     * @return the error message
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets the message of the error response
     *
     * @param message the error message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }
}
