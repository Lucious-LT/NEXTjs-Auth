import User from "@/app/(Models)/User"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const body = await req.json();
        const userData = body.formData;

        //Confirm data exsits
        if (!userData?.email || !userData.password) {
            return NextResponse.json(
                {message: "Please fill in all fields"},
                 {status: 400});
        }
        //Check if user already exists
        const duplicate = await User.findOne({email: userData.email})
        .lean()
        .exec();
        if (duplicate) {
            return NextResponse.json(
                {message: "Duplicate Email"},
                 {status: 409});
        }
        //Hash password
        const hashPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashPassword;
        await User.create(userData);
        return NextResponse.json({message: "User Created. "}, {status: 201});

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error", err}, {status: 500});
    }
}

