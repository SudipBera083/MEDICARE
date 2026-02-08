
import { verifyToken } from "../jwt/jsonwebtokenValidate.js";

export const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers[`authorization`];
    if (!authorizationHeader) {
        return res.status(401).json({
            message: "Authorization header required"
        })
    }
    const token = authorizationHeader.split(" ")[1];  // extract the bearer token

    if (!token) {
        return res.status(401).json({
            message: "Access token required "
        })
    }
    try {
        const decodedToken = verifyToken(token)

        req.user = {
            user_id: decodedToken.id,  // ✅ Correct
            user_role: decodedToken.role
        }
        next()
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid access token "
        })
    }

}


