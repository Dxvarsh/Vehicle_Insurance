import mongoose, { Schema } from "mongoose";
import { Counter } from "./Counter.js";

const notificationSchema = new Schema(
    {
        notificationID: {
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
        },
        messageType: {
            type: String,
            enum: ["Expiry", "Renewal", "Claim-Update", "Payment", "General"],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        sentDate: {
            type: Date,
            default: Date.now,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        deliveryStatus: {
            type: String,
            enum: ["Sent", "Delivered", "Failed"],
            default: "Sent",
        },
    },
    {
        timestamps: true,
    }
);

notificationSchema.pre("save", async function () {
    if (!this.notificationID) {
        const counter = await Counter.findOneAndUpdate(
            { id: "notification_id" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.notificationID = `NOTIF-${String(counter.seq).padStart(3, '0')}`;
    }
});

export const Notification = mongoose.model("Notification", notificationSchema);
