import mongoose from "mongoose";
import { AppError } from "../../shared/errors/AppError.js";
import { Vendor, type IVendor } from "./vendor.model.js";
import { UserService } from "../user/user.service.js";
import { RoleService } from "../role/role.service.js";

export class VendorService {
    static async requestVendor(id: string, data: any) {

        if (!mongoose.Types.ObjectId.isValid(id))
            throw new AppError("Invalid user id ", 400);

        const existingVendor = await Vendor.findOne({ userId: id });

        if (existingVendor) {
            if (existingVendor.isApproved) {
                throw new AppError("You are already a registered vendor", 400);
            }
            throw new AppError("Your vendor request is currently pending", 400);
        }

        const findUser = await UserService.getById(id);

        if (!findUser)
            throw new AppError("User not found", 404);

        const { storeName, licenseNo, city, state, tole } = data;

        if (!storeName || !licenseNo || !city || !state || !tole)
            throw new AppError("Please fill all the required fields", 400);

        const normalizedLicense = licenseNo.toUpperCase().trim();

        const findVendor = await Vendor.findOne({ licenseNo: normalizedLicense }).select("+licenseNo");

        if (findVendor)
            throw new AppError("License number already registered", 409);

        const newVendor = await Vendor.create({ userId: id, storeName: storeName.trim(), licenseNo: normalizedLicense, address: { state: state, city: city, tole: tole } });

        const safeVendor = await newVendor.toObject() as Partial<IVendor>;
        await delete safeVendor.licenseNo;

        return safeVendor;

    }


    static async getVendorRequest() {
        const requests = await Vendor.find({ isPending: true }).sort({ createdAt: -1 });

        if (!requests || requests.length === 0)
            throw new AppError("No requests at the moment", 404);

        return requests;
    }

    static async getVendorRequestById(id: string) {
        const request = await Vendor.findById(id).select("+licenseNo").select("licenseNo");
        if (!request)
            throw new AppError("Request not found", 404);

        return request;
    }

    static async ApproveVendorRequest(id: string) {

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const findRequest = await Vendor.findOne({ _id: id, isPending: true }).session(session);

            if (!findRequest)
                throw new AppError("Pending vendor request not found", 404);

            const findRole = await RoleService.getRoleName("vendor");

            if (!findRole)
                throw new AppError("Vendor role configuration missing", 404);

            await UserService.promoteToVendor(findRequest.userId.toString(), findRole._id.toString(), session);

            findRequest.isPending = false;
            findRequest.isApproved = true;

            await findRequest.save({ session });

            await session.commitTransaction();

            return findRequest;

        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }


    static async RejectVendorRequest(id: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const findRequest = await Vendor.findOne({ _id: id, isPending: true }).session(session);

        if (!findRequest) {
            throw new AppError("No pending request found to reject", 404);
        }

        await Vendor.findByIdAndDelete(id).session(session);

        await session.commitTransaction();
        
        return findRequest;
    } catch (error) {
        await session.abortTransaction();
        throw error; 
    } finally {
        session.endSession();
    }
}

    static async getVendorByUserId(userId: string) {
    return await Vendor.findOne({ userId });
}
}