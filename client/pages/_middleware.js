import {NextResponse} from "next/server";

export async function middleware(req) {
  if (typeof window !== 'undefined') {
    const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = user && JSON.parse(user).currentUser;
    const TOKEN = currentUser?.accessToken;
    const {pathname} = req.nextUrl;

    if (!TOKEN && pathname.includes('/cart')) {
      return NextResponse.redirect("/login");
    } else {
      return NextResponse.next();
    }
  }
}
