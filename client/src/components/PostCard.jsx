import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="group relative w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
      <div className="border border-teal-500 hover:border-2 overflow-hidden rounded-lg">
        <Link to={`/post/${post.slug}`}>
          <img
            src={post.image}
            alt="post cover"
            className="h-48 sm:h-56 lg:h-64 xl:h-72 w-full object-cover transition-all duration-300"
          />
        </Link>
        <div className="p-3">
          <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
          <span className="italic text-sm">{post.category}</span>
          <Link
            to={`/post/${post.slug}`}
            className="block mt-2 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md"
          >
            Read article
          </Link>
        </div>
      </div>
    </div>
  );
}
