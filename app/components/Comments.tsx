"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";
import { CommentList } from "./CommentList";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { baseUrl } from "../lib/connect";

interface CommentsProps {
  postSlug: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

export const Comments: React.FC<CommentsProps> = ({ postSlug }) => {
  const { status } = useSession();

  const [desc, setDesc] = useState("");
  const { data, isLoading, mutate } = useSWR(
    `${baseUrl}api/comments?postSlug=${postSlug}`,
    fetcher,
  );

  const { mutate: postComment, isPending } = useMutation({
    mutationFn: async ({ desc, postSlug }: any) => {
      const payload = {
        desc,
        postSlug,
      };
      const { data } = await axios.post("/api/comments", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Comment not posted",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      mutate();
      setDesc("");
    },
  });

  const handleSubmit = async (desc: string) => {
    postComment({
      desc,
      postSlug,
    });
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      <h1>Comments</h1>
      {status === "authenticated" ? (
        <div className="flex gap-2 w-full">
          <textarea
            className="w-full bg-transparent border-b-2 text-white focus:outline-none border-white"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <button
            onClick={() => handleSubmit(desc)}
            className="px-3 py-2 border-gray-400  border-2"
          >
            {isPending ? "sending" : "Send"}
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className="flex flex-col gap-6 ">
        {isLoading ? (
          "Loading"
        ) : (
          <CommentList comments={data} postSlug={postSlug} />
        )}
      </div>
    </div>
  );
};
