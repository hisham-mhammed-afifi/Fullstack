const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => jwt.sign(payload, process.env.JWT_SECRET);

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
  const accessTokenJWT = createJWT({ payload: { user } });

  const longerExp = 1000 * 60 * 60 * 24 * 30;

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + longerExp),
  });

  return accessTokenJWT;
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
