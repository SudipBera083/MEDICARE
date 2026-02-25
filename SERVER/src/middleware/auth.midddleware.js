
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    // 🔹 Check if header exists
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization header required"
      });
    }

    // 🔹 Extract token
    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access token required"
      });
    }

    // 🔹 Verify token (SYNCHRONOUS — no Promise)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token ➡️:", decoded);

    // 🔹 Attach decoded user directly
    req.user = decoded;

    next();

  } catch (error) {
    console.error("JWT Error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

// export const authMiddleware = (req, res, next) => {
//     const authorizationHeader = req.headers[`authorization`];
//     console.log("AFTER AUTH req.user:", req.user);
//     if (!authorizationHeader) {
//         return res.status(401).json({
//             message: "Authorization header required"
//         })
//     }
//     const token = authorizationHeader.split(" ")[1];  // extract the bearer token

//     if (!token) {
//         return res.status(401).json({
//             message: "Access token required "
//         })
//     }
//     try {
//         const decodedToken = verifyToken(token)

//         req.user = {
//             user_id: decodedToken.id,  // ✅ Correct
//             user_role: decodedToken.role
//         }
//         next()
//     }
//     catch (error) {
//         return res.status(401).json({
//             message: "Invalid access token "
//         })
//     }

// }


