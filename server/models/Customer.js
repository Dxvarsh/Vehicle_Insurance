import mongoose, { Schema } from "mongoose";
import { Counter } from "./Counter.js";

const customerSchema = new Schema(
    {
        customerID: {
            type: String,
            unique: true,
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
        },
        contactNumber: {
            type: String,
            required: [true, "Contact number is required"],
            unique: true,
            match: [/^\d{10}$/, "Please fill a valid 10-digit contact number"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
        },
        address: {
            type: String,
            required: [true, "Address is required"],
        },
        vehicleIDs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Vehicle",
            },
        ],
    },
    {
        timestamps: true,
    }
);

customerSchema.pre("save", async function () {
    if (!this.customerID) {
        const counter = await Counter.findOneAndUpdate(
            { id: "customer_id" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.customerID = `CUST-${String(counter.seq).padStart(3, '0')}`;
    }
});

export const Customer = mongoose.model("Customer", customerSchema);
