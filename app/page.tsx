import { CreatePost } from "@/components/posts/CreatePost";
import { PostList } from "@/components/posts/PostList";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {session ? (
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
          <CreatePost />
        </div>
      ) : (
        <div className="text-center mb-8">
          <p className="text-lg">
            Please{" "}
            <a href="/auth/signin" className="text-blue-600 hover:underline">
              sign in
            </a>{" "}
            to create a post.
          </p>
        </div>
      )}
      
      <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
      <PostList />
    </div>
  );
}
