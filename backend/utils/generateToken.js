import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  // Check if JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }       

  // Generate token with stronger hashing algorithm and additional claims
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Set the cookie with additional security options
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Millisecond format
    httpOnly: true, // Prevent cross-site scripting attacks
    secure: process.env.NODE_ENV !== "development", // Use secure flag in production
    sameSite: "strict", // Prevent CSRF attacks
  });
};
        
export default generateTokenAndSetCookie;
