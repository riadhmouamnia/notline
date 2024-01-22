import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export default function middleware(req: NextApiRequest | any) {
  let verify = req.cookies.get("loggedin");
  let url = req.url;

  if (!verify && url.includes("/dashboard")) {
    return NextResponse.redirect("notline.vercel.app/login");
  }

  if (verify && url.includes("/login")) {
    return NextResponse.redirect("notline.vercel.app/");
  }
}
