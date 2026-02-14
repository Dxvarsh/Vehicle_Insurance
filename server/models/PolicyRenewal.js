import mongoose, { Schema } from "mongoose";
import { Counter } from "./Counter.js";

const policyRenewalSchema = new Schema(
    {
        renewalID: {
            type: String,
            unique: true,
        },
        policyID: {
            type: Schema.Types.ObjectId,
            ref: "InsurancePolicy",
            required: true,
        },
        premiumID: {
            type: Schema.Types.ObjectId,
            ref: "Premium",
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
        renewalDate: {
            type: Date,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true,
        },
        renewalStatus: {
            type: String,
            enum: ["Pending", "Approved", "Rejected", "Expired"],
            default: "Pending",
        },
        reminderSentStatus: {
            type: Boolean,
            default: false,
        },
        reminderSentDate: {
            type: Date,
        },
        adminRemarks: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

policyRenewalSchema.pre("save", async function () {
    if (!this.renewalID) {
        const counter = await Counter.findOneAndUpdate(
            { id: "renewal_id" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.renewalID = `REN-${String(counter.seq).padStart(3, '0')}`;
    }
});

export const PolicyRenewal = mongoose.model("PolicyRenewal", policyRenewalSchema);
