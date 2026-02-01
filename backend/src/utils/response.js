// utils/response.js

/**
 * Standard success response
 */
export const successResponse = (
  res,
  message = "Success",
  data = {},
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Standard error response
 */
export const errorResponse = (
  res,
  message = "Internal Server Error",
  statusCode = 500,
  error = null
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error ? error.message || error : undefined,
  });
};
