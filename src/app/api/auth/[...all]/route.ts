import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { toNextJsHandler } from "better-auth/next-js"

export const { GET, POST } = toNextJsHandler(auth.handler)

export async function DELETE(req: Request) {
  const response = NextResponse.json({ message: "Logged out" })
  await auth.logout({ req, res: response })

  return response
}
