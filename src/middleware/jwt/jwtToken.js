import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (res, user) => {
  try {
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    console.log("userid here");
    console.log(user._id);
    return token;
  } catch (err) {
    console.log("error message while generating token:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default generateToken;
