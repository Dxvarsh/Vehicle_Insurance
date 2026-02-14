import mongoose, { Schema } from "mongoose";
import { Counter } from "./Counter.js";

const vehicleSchema = new Schema(
    {
        vehicleID: {
            type: String,
            unique: true,
        },
        customerID: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },
        vehicleNumber: {
            type: String,
            required: [true, "Vehicle number is required"],
            unique: true,
            uppercase: true,
            trim: true,
            // Simple validation for vehicle number, adjust as per country standards
            match: [/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/, "Please fill a valid vehicle number (e.g. MH12AB1234)"],
        },
        vehicleType: {
            type: String,
            enum: ["2-Wheeler", "4-Wheeler", "Commercial"],
            required: [true, "Vehicle type is required"],
        },
        model: {
            type: String,
            required: [true, "Model is required"],
        },
        registrationYear: {
            type: Number,
            required: [true, "Registration year is required"],
            min: [1990, "Year must be 1990 or later"],
            max: [new Date().getFullYear(), "Year cannot be in the future"],
        },
    },
    {
        timestamps: true,
    }
);

vehicleSchema.pre("save", async function () {
    if (!this.vehicleID) {
        const counter = await Counter.findOneAndUpdate(
            { id: "vehicle_id" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.vehicleID = `VEH-${String(counter.seq).padStart(3, '0')}`;
    }
});

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
