import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = 'edge';
export const preferredRegion = 'iad1';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Get user id from email
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create post
    const { data: post, error } = await supabase
      .from('posts')
      .insert([
        {
          title,
          content,
          published: true,
          author_id: user.id
        }
      ])
      .select('*, author:users(name, email)')
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Error creating post" },
        { status: 500 }
      );
    }

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users(name, email)
      `)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "Error fetching posts" },
        { status: 500 }
      );
    }

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    );
  }
}