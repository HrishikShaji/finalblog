"use client";

import { useState } from "react";
import { Comment } from "./Comment";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../lib/connect";

interface CommentListProps {
  comments: any;
  postSlug: string | null;
  commentId?: string;
  reply: boolean;
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  postSlug,
  reply,
}) => {
  const [showReplies, setShowReplies] = useState(
    comments ? Array(comments.length).fill(false) : [],
  );
  const toggleReplies = async (index: number) => {
    const newShowReplies = [...showReplies];
    newShowReplies[index] = !newShowReplies[index];
    setShowReplies(newShowReplies);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {comments?.map((comment: any, index: number) => {
        console.log(reply);
        return (
          <div
            key={comment.id}
            className={` pb-4 flex flex-col gap-2 pl-4   items-start border-neutral-700 ${
              reply && "border-l"
            } `}
          >
            <Comment item={comment} postSlug={postSlug} isReply={reply} />
            <button
              onClick={() => toggleReplies(index)}
              className="px-2 font-semibold text-gray-400  py-1 text-xs border-2 border-gray-400 focus:outline-none"
            >
              {showReplies[index] ? "Hide Replies" : "Show Replies"}
            </button>
            {showReplies[index] && (
              <div className="pl-10 w-full">
                <CommentListContainer
                  commentId={comment.id}
                  postSlug={postSlug}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const CommentListContainer: React.FC<{
  commentId: string;
  postSlug: string | null;
}> = ({ commentId, postSlug }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["replies", commentId, postSlug],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}api/comments/${commentId}?postSlug=${postSlug}`,
        { method: "GET" },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch replies");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching replies</div>;
  }

  return (
    <CommentList
      comments={data}
      postSlug={postSlug}
      commentId={commentId}
      reply={true}
    />
  );
};
