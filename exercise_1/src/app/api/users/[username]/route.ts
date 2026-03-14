import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ username: string }>;
};

export async function GET(request: NextRequest, { params }: Context) {
  const { username } = await params;
  return NextResponse.json({
    username: username,
  });
}
