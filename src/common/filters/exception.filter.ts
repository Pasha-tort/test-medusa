import { DomainError, HttpError } from "@common/exceptions";

export const exceptionFilter = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err instanceof DomainError) {
    return res.status(500).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
};
