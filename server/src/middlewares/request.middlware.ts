import { Request, Response, NextFunction } from "express";

const validateQueryParams = (
  req: Request,
  res: Response,
  next: NextFunction,
  params: string[]
) => {
  //check if the query params are valid
  const queryParams = req.query;
  const queryParamsKeys = Object.keys(queryParams);
  console.log(`queryParamsKeys ${queryParamsKeys}`);
  const isValid = params.every((param) => queryParamsKeys.includes(param));
  if (!isValid) {
    res.status(400).json({
      message: "Invalid query params",
    });
    return;
  }
  next();
};

export { validateQueryParams };
