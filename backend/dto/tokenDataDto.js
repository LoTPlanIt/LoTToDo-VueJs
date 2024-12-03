class TokenData {
  userId = "";
  genUserId = "";
  username = "";
  iat = 0;
  exp = 0;

  constructor(req) {
    this.userId = req.tokenData._id;
    this.genUserId = req.tokenData.user_id;
    this.username = req.tokenData.username;
    this.iat = req.tokenData.iat;
    this.exp = req.tokenData.exp;
  }
}

module.exports = TokenData;