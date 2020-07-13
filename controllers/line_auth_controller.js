const axios = require("axios");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = class LineAuthController {
  async login(req, res, next) {
    try {
      // 進行 accessToken 認證
      const p_verify = {
        params: {
          access_token: req.body.accessToken,
        },
      };
      const r_verify = await axios.get("https://api.line.me/oauth2/v2.1/verify", p_verify);

      if (r_verify.data.client_id != process.env.CLIENT_LIFF_CHANNEL) {
        next(createError(401, " Please use open this page with the Line chatroom."));
      } else {
        // 取得 userId
        const c_profile = {
          headers: { Authorization: `Bearer ${req.body.accessToken}` },
        };
        const r_profile = await axios.get("https://api.line.me/v2/profile", c_profile);
        const userId = r_profile.data.userId;
        // 計算 Token
        const token = jwt.sign({ userId: userId }, userId);
        // return
        res.json({ token: token });
      }
    } catch (error) {
      next(createError(401, error));
    }
  }
};
