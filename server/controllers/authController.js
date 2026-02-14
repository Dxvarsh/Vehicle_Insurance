import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.js";
import { Customer } from "../models/Customer.js";
import { generateAccessAndRefereshTokens, cookieOptions } from "../utils/token.js";
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, name, email, contactNumber, address } = req.body;

    if ([username, password, name, email, contactNumber, address].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ username });
    if (existedUser) {
        throw new ApiError(409, "Username already exists");
    }

    const existedCustomer = await Customer.findOne({ $or: [{ email }, { contactNumber }] });
    if (existedCustomer) {
        throw new ApiError(409, "Email or Contact Number already registered");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const customer = await Customer.create([{
            name,
            email,
            contactNumber,
            address
        }], { session });

        const user = await User.create([{
            username,
            password,
            role: "Customer",
            linkedCustomerID: customer[0]._id
        }], { session });

        await session.commitTransaction();
        session.endSession();

        const createdUser = await User.findById(user[0]._id).select("-password");

        return res.status(201).json(
            new ApiResponse(201, createdUser, "User registered successfully")
        );
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(500, error.message || "Failed to register user");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, "Username and password are required");
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user);

    const loggedInUser = await User.findById(user._id).select("-password");

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged In Successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out"));
});

export { registerUser, loginUser, logoutUser };
