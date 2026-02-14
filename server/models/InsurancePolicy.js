import mongoose, { Schema } from "mongoose";
import { Counter } from "./Counter.js";

const premiumRulesSchema = new Schema({
    vehicleTypeMultiplier: {
        type: Map,
        of: Number,
        default: {
            "2-Wheeler": 0.8,
            "4-Wheeler": 1.0,
            "Commercial": 1.5
        }
    },
    ageDepreciation: {
        type: Number,
        default: 5 // percentage per year
    },
    coverageMultiplier: {
        type: Map,
        of: Number,
        default: {
            "Third-Party": 0.6,
            "Comprehensive": 1.0,
            "Own-Damage": 0.8
        }
    }
}, { _id: false });

const insurancePolicySchema = new Schema(
    {
        policyID: {
            type: String,
            unique: true,
        },
        policyName: {
            type: String,
            required: [true, "Policy name is required"],
            unique: true,
        },
        coverageType: {
            type: String,
            enum: ["Third-Party", "Comprehensive", "Own-Damage"],
            required: [true, "Coverage type is required"],
        },
        policyDuration: {
            type: Number,
            enum: [12, 24, 36],
            required: [true, "Policy duration is required (in months)"],
        },
        baseAmount: {
            type: Number,
            required: [true, "Base amount is required"],
            min: 0,
        },
        premiumRules: {
            type: premiumRulesSchema,
            default: () => ({})
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

insurancePolicySchema.pre("save", async function () {
    if (!this.policyID) {
        const counter = await Counter.findOneAndUpdate(
            { id: "policy_id" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.policyID = `POL-${String(counter.seq).padStart(3, '0')}`;
    }
});

export const InsurancePolicy = mongoose.model("InsurancePolicy", insurancePolicySchema);
