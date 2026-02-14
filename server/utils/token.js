import { ENV } from "../config/env.js";

const generateAccessAndRefereshTokens = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // If you want to store refreshToken in DB, you can add a field in User model
        // For now we just return them
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

const cookieOptions = {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "Lax"
};

export { generateAccessAndRefereshTokens, cookieOptions };
