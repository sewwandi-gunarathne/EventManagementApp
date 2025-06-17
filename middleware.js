import { NextResponse } from "next/server";

export function middleware (req) {
    const url = req.nextUrl.clone();
    const path = url.pathname;

    const releaseDate = new Date('2025-06-10T12:00:00');
    const now = new Date();

    if(path.startsWith('/admin') && now < releaseDate) {
       // url.pathname = '/'
        return new NextResponse('Not Found', { status: 404 });
    }

    return NextResponse.next();
}