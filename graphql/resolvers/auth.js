const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const Church = require("../../models/church");

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
        name: args.userInput.name
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  createChurch: async ({ userInput }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const existingChurch = await Church.findOne({
        name: userInput.name
      });
      if (existingChurch) {
        throw new Error("Church exists already.");
      }

      const church = new Church({
        name: userInput.name,
        location: userInput.location,
        address: userInput.address
      });

      const createdChurch = await church.save();

      return {
        ...createdChurch._doc,
        _id: createdChurch._id.toString()
        // name: createdChurch.name,
        // location: createdChurch.location,
        // address: createdChurch.address,
        // createdAt: createdChurch, createdAt
      };
    } catch (err) {
      throw Error("createChurch err ", err);
    }
  },
  deleteChurch: async function({ _id }, req) {
    console.log("deleteChurch id ", _id);
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const deletedChurch = await Church.findByIdAndDelete({ _id });
    return {
      _id: deletedChurch.id,
      name: deletedChurch.name
    };
  },
  login: async ({ userInput }) => {
    const user = await User.findOne({ email: userInput.email });
    if (!user) {
      throw new Error("User does not exist!");
    }
    const isEqual = await bcrypt.compare(userInput.password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "somesupersecretkey",
      {
        expiresIn: 1000
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
  Profile: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];
    let decodedToken;
    decodedToken = jwt.verify(token, "somesupersecretkey");
    // console.log("authHeader ", authHeader);
    // console.log("token ", token);
    // console.log("decodedToken ", decodedToken);
    // console.log("test ");
    if (decodedToken) {
      const user = await User.findById(decodedToken.userId);
      console.log(
        `Profile resolver says this user: ${user.name} email: ${
          user.email
        } is found!`
      );
      return {
        id: user.id,
        name: user.name,
        email: user.email
      };
    }
    return null;
  },
  lastLoginUpdate: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    User.findOne({ email: args.email }).then(foundUser => {
      if (!foundUser) {
        throw new Error("User not found!");
      }

      const updatelastLoginAt = new User({
        lastLoginAt: Date().toLocaleString()
      });
      updatelastLoginAt
        .save()
        .then(res => true)
        .catch(err => false);
    });
  }
};
