import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const userSchema = new Schema(
    {
        userID: {
            type: String,
            unique: true,
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            lowercase: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
        },
        role: {
            type: String,
            enum: ["Admin", "Staff", "Customer"],
            required: [true, "Role is required"],
        },
        linkedCustomerID: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            userID: this.userID,
            username: this.username,
            role: this.role,
        },
        ENV.JWT_SECRET,
        {
            expiresIn: ENV.JWT_EXPIRE,
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        ENV.JWT_REFRESH_SECRET,
        {
            expiresIn: ENV.JWT_REFRESH_EXPIRE,
        }
    );
};

export const User = mongoose.model("User", userSchema);
