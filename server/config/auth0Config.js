import {auth} from 'express-oauth2-jwt-bearer'

export const jwtCheck = auth({
    audience:"https://dev-htkjk3aua38i5rux.us.auth0.com/api/v2/",
    issuerBaseURL:"https://dev-htkjk3aua38i5rux.us.auth0.com",
    tokenSigningAlg:"RS256"
});

export const checkAdminRole = (req,res,next) =>{
    const roles = req.auth?.claims['https://your-namespace/roles'];
    if(!roles || !roles.includes('admin')){
        return res.status(403).json({message: "Access denied. Admins only"})
    }
    next();
}