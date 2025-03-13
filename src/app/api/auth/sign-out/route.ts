import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {

  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/sign-in'

  const storedCookies = await cookies()

  storedCookies.delete('token')

  return NextResponse.redirect(redirectUrl)
 }