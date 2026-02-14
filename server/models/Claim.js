import mongoose, { Schema } from "mongoose";
import { Counter } from "./Counter.js";

const claimSchema = new Schema(
    {
        claimID: {
            type: String,
            unique: true,
        },
        customerID: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
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
        premiumID: {
            type: Schema.Types.ObjectId,
            ref: "Premium",
            required: true,
        },
        claimReason: {
            type: String,
            required: [true, "Claim reason is required"],
            minlength: [10, "Reason must be at least 10 characters"],
        },
        supportingDocuments: [
            {
                type: String, // URLs
            },
        ],
        claimDate: {
            type: Date,
            default: Date.now,
        },
        claimAmount: {
            type: Number,
        },
        claimStatus: {
            type: String,
            enum: ["Pending", "Approved", "Rejected", "Under-Review"],
            default: "Pending",
        },
        adminRemarks: {
            type: String,
        },
        processedDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

claimSchema.pre("save", async function () {
    if (!this.claimID) {
        const counter = await Counter.findOneAndUpdate(
            { id: "claim_id" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.claimID = `CLM-${String(counter.seq).padStart(3, '0')}`;
    }
});

export const Claim = mongoose.model("Claim", claimSchema);
