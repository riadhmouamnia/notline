import { NextApiRequest } from "next";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(req: NextApiRequest | any) {
  let verify = req.cookies.get("loggedin");
  const url = req.nextUrl.clone();

  if (!verify && url.pathname.includes("/dashboard")) {
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }

  if (verify && url.pathname.includes("/login")) {
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }
}
