import { auth } from "express-oauth2-jwt-bearer";

export const jwtCheck = auth({
  audience: [
    "http://api.realEstate.com",
    "https://dev-p41ki7qocbxnmh20.us.auth0.com/userinfo",
  ],
  issuerBaseURL: "https://dev-p41ki7qocbxnmh20.us.auth0.com",
  tokenSigningAlg: "RS256",
});

export const checkAdminRole = (req, res, next) => {
  console.log("Auth object ", req.auth);
  const roles = req.auth?.payload?.["https://your-namespace/roles"];
  console.log("roles from token:", roles);
  if (!roles || !roles.includes("Admin")) {
    return res.status(403).json({ message: "Access denied. Admins only" });
  }
  next();
};
