import { User } from "./schema/user.schema.js";
import { customErrorHandler } from "../../middleware/errorHandling/error.handling.js";
import { verifyOTP } from "../../utils/otp./veifyOTP.js";
export default class UserRepository {
  async createUser(user) {
    const newUser = new User(user);
    await newUser.save();
  }

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      return { success: true, res: user };
    } catch (error) {
      console.error(`Error getting user by email: ${error.message}`);
      throw new customErrorHandler(404, "Unable to get user by email");
    }
  }

  async getUserByUsername(username) {
    try {
      const user = await User.findOne({ username });

      const followersLength = user.followers.length || 0;
      const followingLength = user.following.length || 0;

      const { followers, following, ...userData } = user._doc;

      return {
        success: true,
        res: { ...userData, followersLength, followingLength },
      };
    } catch (error) {
      console.error(`Error getting user by username: ${error.message}`);
      throw new customErrorHandler(404, "Unable to get user by username");
    }
  }

  async updateUser(id, user) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: user },
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        throw new customErrorHandler(404, "User not found");
      }
      const followersLength = updatedUser.followers.length || 0;
      const followingLength = updatedUser.following.length || 0;
      const { followers, following, ...userData } = user._doc;

      return {
        success: true,
        res: { ...userData, followersLength, followingLength },
      };
    } catch (error) {
      console.error(`Error updating user: ${error.message}`);
      throw new customErrorHandler(404, "Unable to update user");
    }
  }

  async updateUserPassword(id, password) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: { password } },
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        throw new customErrorHandler(404, "User not found");
      }
      return updatedUser;
    } catch (error) {
      console.error(`Error updating user: ${error.message}`);
      throw new customErrorHandler(404, "Unable to update user");
    }
  }
  async deleteUser(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new customErrorHandler(404, "User not found");
      }
      return user;
    } catch (error) {
      console.error(`Error deleting user: ${error.message}`);
      throw new customErrorHandler(404, "Unable to delete user");
    }
  }
  async followUser(userId, followerId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new customErrorHandler(404, "User not found");
      } else if (user.followers.includes(followerId)) {
        throw new customErrorHandler(404, "User already followed");
      } else if (user._id === followerId) {
        throw new customErrorHandler(404, "You cannot follow yourself");
      } else {
        user.followers.push(followerId);
        user.following.push(userId);
        await user.save();
      }

      console.log(`New user ${user.name} followed by user ${followerId}`);
      return user;
    } catch (error) {
      console.error(`Error following user: ${error.message}`);
      throw new customErrorHandler(404, "Unable to follow user");
    }
  }

  async unfollowUser(userId, followerId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new customErrorHandler(404, "User not found");
      } else if (user.followers.includes(followerId)) {
        throw new customErrorHandler(404, "User already followed");
      } else if (user._id === followerId) {
        throw new customErrorHandler(404, "You cannot follow yourself");
      } else {
        user.followers = user.followers.filter((id) => id !== followerId);
        user.following = user.following.filter((id) => id !== userId);
        await user.save();
      }
      return user;
    } catch (error) {
      console.error(`Error unfollowing user: ${error.message}`);
      throw new customErrorHandler(404, "Unable to unfollow user");
    }
  }
}
