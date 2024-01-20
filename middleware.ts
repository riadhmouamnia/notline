import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export default function middleware(req: NextApiRequest | any){
    let verify = req.cookies.get("loggedin");
    let url = req.url
    
    if(!verify && url.includes('/dashboard')){
        return NextResponse.redirect("http://localhost:3000/login");
    }

    if (verify && url.includes('/login')) {
      return NextResponse.redirect("http://localhost:3000/");
    }
}