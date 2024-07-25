import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience:"https://dev-htkjk3aua38i5rux.us.auth0.com/api/v2/",
    issuerBaseURL:"https://dev-htkjk3aua38i5rux.us.auth0.com",
    tokenSigningAlg:"RS256"
});

export default jwtCheck