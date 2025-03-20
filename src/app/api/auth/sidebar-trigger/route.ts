import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const toggleSidebarTriggerState = searchParams.get("toggleSidebarTriggerState")

  return NextResponse.json(toggleSidebarTriggerState)
 }

 