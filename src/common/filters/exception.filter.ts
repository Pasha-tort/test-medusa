import { DomainError, HttpError } from "@common/exceptions";

export const exceptionFilter = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res
      .status(err.status)
      .json({ error: err.message, status: err.status });
  }

  if (err instanceof DomainError) {
    return res.status(500).json({ error: err.message, status: 500 });
  }

  console.error(err);
  return res.status(500).json({ error: "Internal server error", status: 500 });
};
