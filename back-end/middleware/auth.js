const auth = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const authHeader = req.headers;
  const token = authHeader && authHeader["authorization"].split(" ")[1];
  if (!token) {
    return res
      .status(200)
      .json({ success: false, message: "Error! Token was not provided." });
  }

  //Decoding the token
  const decodedToken = jwt.verify(token, JWT_SECRET);
  if (!decodedToken) {
    return res.status(401).json({ message: "Not Authorized!" });
  }
  next();
};
