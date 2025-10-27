export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message)
    this.name = "AppError"
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
    }
  }

  if (error instanceof Error) {
    console.error("[v0] Error:", error.message)
    return {
      statusCode: 500,
      message: "An unexpected error occurred",
    }
  }

  return {
    statusCode: 500,
    message: "An unexpected error occurred",
  }
}
