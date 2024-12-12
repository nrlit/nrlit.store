type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

type ErrorResponse = {
  success: false;
  message: string;
};

export function successResponse<T>(
  data: T,
  message: string = "Success"
): Response {
  const response: SuccessResponse<T> = { success: true, message, data };
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export function errorResponse(message: string, status: number = 400): Response {
  const response: ErrorResponse = { success: false, message };
  return new Response(JSON.stringify(response), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
