import React, { useEffect, useState } from "react";

const fetchPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
    return res.json();
};

const fetchComments = async (postId) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    return res.json();
};

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [activeCommentPostId, setActiveCommentPostId] = useState(null);
    const [comments, setComments] = useState({});

    useEffect(() => {
        fetchPosts().then(setPosts);
    }, []);

    const loadComments = async (postId) => {
        if (activeCommentPostId === postId) {
            setActiveCommentPostId(null); // Toggle off if it's already open
            return;
        }

        if (!comments[postId]) {
            const postComments = await fetchComments(postId);
            setComments((prev) => ({ ...prev, [postId]: postComments }));
        }

        setActiveCommentPostId(postId); // Set active comment post
    };

    return (
        <div className="flex justify-center mx-auto p-4">
            <div>
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white shadow-md rounded-md p-4 mb-4"
                    >
                        <h3 className="text-lg font-bold">{post.title}</h3>
                        <p className="text-gray-600 mt-2">{post.body}</p>
                        <button
                            onClick={() => loadComments(post.id)}
                            className="mt-4 text-blue-600 hover:text-blue-800"
                        >
                            {activeCommentPostId === post.id ? "Hide Comments" : "Load Comments"}
                        </button>
                        {activeCommentPostId === post.id && comments[post.id] && (
                            <ul className="mt-2 text-sm text-gray-700">
                                {comments[post.id].map((comment) => (
                                    <li key={comment.id} className="border-b border-t pb-2 mb-2">
                                        <strong>{comment.name}</strong> <span className="text-gray-500">({comment.email})</span>
                                        <p>{comment.body}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;
