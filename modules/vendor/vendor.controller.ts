import type { Request, Response } from "express";
import { VendorService } from "./vendor.service.js";
import { catchAsync } from "../../shared/errors/catchAsync.js";

export class VendorController {
    static requestVendor = catchAsync(async (req: Request, res: Response) => {
        if(!req.user)
            return res.status(403).json({success:false, message:"Please login"});

        const userId = req.user._id.toString();

        const vendor = await VendorService.requestVendor(userId, req.body)

        return res.status(201).json({success:true, message:"Request for vendor successfully", data:vendor});
    });

    static approveVendorRequest = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        if(!id)
            return res.status(404).json({success:false, message:"Invalid Id"});

        const approve = await VendorService.ApproveVendorRequest(id.toString());

        return res.status(200).json({success:true, message:"Request approved successfully", data:approve});
    });

    static resjectVendorRequest = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        if(!id)
            return res.status(404).json({success:false, message:"Invalid Id"});

        const reject = await VendorService.RejectVendorRequest(id.toString());

        return res.status(200).json({success:true, message:"Request rejected successfully", data:reject});
    });

    static getAllVendorRequest = catchAsync(async (req: Request, res: Response) => {
        const requests = await VendorService.getVendorRequest();

        return res.status(200).json({success:true, message:"Vendor requests fetched successfully", data:requests});
    });

    static getVendorRequestById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        if(!id)
            return res.status(404).json({success:false, message:"Invalid Id"});

        const request = await VendorService.getVendorRequestById(id.toString())

        return res.status(200).json({success:true, message:"Vendor request fetched successfully", data:request});
    });
}