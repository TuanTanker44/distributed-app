import jwt from "jsonwebtoken";

const { sign, verify } = jwt;

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret_dev";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret_dev";

const ACCESS_EXPIRES = "15m";
const REFRESH_EXPIRES = "7d";

function generateAccessToken(user) {
  return sign(
    {
      id: user.id,
      role: user.role,
    },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES },
  );
}

function generateRefreshToken(user) {
  return sign(
    {
      id: user.id,
    },
    REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRES },
  );
}

function verifyAccessToken(token) {
  try {
    return verify(token, ACCESS_SECRET);
  } catch (err) {
    return null;
  }
}

function verifyRefreshToken(token) {
  try {
    return verify(token, REFRESH_SECRET);
  } catch (err) {
    return null;
  }
}

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
