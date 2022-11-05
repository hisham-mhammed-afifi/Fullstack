const { UnauthenticatedError } = require("../errors");
const { isTokenValid, attachCookiesToResponse } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  const { accessToken } = req.signedCookies;
  try {
    if (accessToken) {
      const { user } = isTokenValid(accessToken);
      req.user = user;
      next();
    }
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = authenticateUser;
