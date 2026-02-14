import mongoose, { Schema } from "mongoose";
import { Counter } from "./Counter.js";

const premiumSchema = new Schema(
    {
        premiumID: {
            type: String,
            unique: true,
        },
        policyID: {
            type: Schema.Types.ObjectId,
            ref: "InsurancePolicy",
            required: true,
        },
        vehicleID: {
            type: Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },
        customerID: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },
        calculatedAmount: {
            type: Number,
            required: [true, "Calculated amount is required"],
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },
        paymentDate: {
            type: Date,
        },
        transactionID: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

premiumSchema.pre("save", async function () {
    if (!this.premiumID) {
        const counter = await Counter.findOneAndUpdate(
            { id: "premium_id" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.premiumID = `PREM-${String(counter.seq).padStart(3, '0')}`;
    }
});

export const Premium = mongoose.model("Premium", premiumSchema);
