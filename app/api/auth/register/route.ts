import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    // Create new user
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        { name, email, password: hashedPassword }
      ])
      .select('id, name, email')
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Error creating user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating user" },
      { status: 500 }
    );
  }
}