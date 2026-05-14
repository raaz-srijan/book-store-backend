import type { Request, Response } from "express";
import { VendorService } from "./vendor.service.js";

export class VendorController {
    static async requestVendor(req:Request, res:Response) {

        if(!req.user)
            return res.status(403).json({success:false, message:"Please login"});

        const userId = req.user._id.toString();

        const vendor = await VendorService.requestVendor(userId, req.body)

        return res.status(201).json({success:true, message:"Request for vendor successfully", data:vendor});
    }

    static async approveVendorRequest(req:Request, res:Response) {

        const id = req.params;

        if(!id)
            return res.status(404).json({success:false, message:"Invalid Id"});

        const approve = await VendorService.ApproveVendorRequest(id.toString());

        return res.status(200).json({success:true, message:"Request approved successfully", data:approve});
    }

    static async resjectVendorRequest(req:Request, res:Response) {
        const id = req.params;
        if(!id)
            return res.status(404).json({success:false, message:"Invalid Id"});

        const reject = await VendorService.RejectVendorRequest(id.toString());

        return res.status(200).json({success:true, message:"Request rejected successfully", data:reject});
    }

    static async getAllVendorRequest(req:Request, res:Response) {
        const requests = await VendorService.getVendorRequest();

        return res.status(200).json({success:true, message:"Vendor requests fetched successfully", data:requests});
    }

    static async getVendorRequestById(req:Request, res:Response) {

        const id = req.params;

        const request = await VendorService.getVendorRequestById(id.toString())

        return res.status(200).json({success:true, message:"Vendor request fetched successfully", data:request});
    }
}