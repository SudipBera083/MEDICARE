// import jsonwebtoken from 'jsonwebtoken';
// export const verifyToken = async (token) => {
//     const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET)
//     console.log("Decoded Token id: ", decodedToken.id)
//     console.log("Decoded Token ➡️: ", decodedToken)
//     return decodedToken
// }
import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded Token ➡️:", decoded);
  return decoded;
};