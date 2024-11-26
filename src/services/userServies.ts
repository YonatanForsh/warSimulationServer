import { Request, Response } from "express";
import userSchema from "../models/userSchema";
import bcrypt, { compare } from "bcrypt"
import { LoginDto } from "../dto/userDto";
import organizationList from "../../Data/organization.json"
import { sign } from "jsonwebtoken";
import Jwt from "jsonwebtoken";
import { IOrg } from "../models/orgModel";


export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password, org, location } = req.body;
        const organization = checkOrgName(organizationList, org)
        console.log(username,password,org,location,organization);    
        const hashPass = await bcrypt.hash(password, 10)
        const newUser = new userSchema({ username, password: hashPass, org: organization, location })
        await newUser.save()
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {        
        res.status(500).json({ message: "User creation failed", error });
    }
}

export const userLogin = async (user: LoginDto) => {
    try {
        const userFromDatabase = await userSchema.findOne({ username: user.username }).lean();  
        if (!userFromDatabase) throw new Error("user not found");
        const match = await compare(user.password, userFromDatabase.password);
        if (!match) throw new Error("wrong password");
        const token = await Jwt.sign({
            user_id: userFromDatabase._id,
            username: userFromDatabase.username,
            org: userFromDatabase.org,
            location: userFromDatabase.location
        }, process.env.JWT_SECRET!,
            {
                expiresIn: "10m"
            }
        );   
        return {...userFromDatabase, token, password: "*******"};
    } catch (err) {
        throw err;
    }
};

function checkOrgName(list:any[], name:string) {    
    return list.find(org => org.name == name);
}
