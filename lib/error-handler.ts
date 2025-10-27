export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode = 500,
  ) {
    super(message)
    this.name = "AppError"
  }
}

export function handleError(error: unknown) {
  console.error("[v0] Error:", error)

  if (error instanceof AppError) {
    return {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
    }
  }

  if (error instanceof Error) {
    return {
      code: "INTERNAL_ERROR",
      message: error.message,
      statusCode: 500,
    }
  }

  return {
    code: "UNKNOWN_ERROR",
    message: "An unexpected error occurred",
    statusCode: 500,
  }
}
