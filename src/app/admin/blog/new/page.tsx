import BlogForm from "../BlogForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New post</h1>
      <BlogForm mode="create" />
    </div>
  );
}