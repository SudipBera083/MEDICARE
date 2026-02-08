import jsonwebtoken from 'jsonwebtoken';
export const verifyToken = (token) => {
    const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    console.log("Decoded Token id: ", decodedToken.id)
    console.log("Decoded Token ➡️: ", decodedToken)
    return decodedToken
}

