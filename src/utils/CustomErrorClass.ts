class CustomError extends Error {
  statusCode: string;
  constructor(message: string, statusCode?: string) {
    super(message);
    this.statusCode = statusCode || "400";
  }
}

export default CustomError;
