"use client";

import { ExtendedPost } from "@/types/types";
import { Vote, VoteType } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";

interface LikeClientProps {
  item: ExtendedPost;
}
export const LikeClient: React.FC<LikeClientProps> = ({ item }) => {
  const session = useSession();
  const votesAmt = item.votes.reduce((acc: number, vote: Vote) => {
    if (vote.type === "LIKE") return acc + 1;
    if (vote.type === "UNLIKE") return acc - 1;
    return acc;
  }, 0);
  const initialVote = item.votes.find(
    (vote: Vote) => vote.emailId === session.data?.user?.email,
  );

  const [likesAmt, setLikesAmt] = useState<number>(votesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote?.type);

  useEffect(() => {
    setCurrentVote(initialVote?.type);
  }, [initialVote?.type]);
  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload = {
        postId: item.id,
        voteType,
      };

      await axios.patch("/api/like", payload);
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        setCurrentVote(undefined);
        if (type === "LIKE") setLikesAmt((prev) => prev - 1);
        else if (type === "UNLIKE") setLikesAmt((prev) => prev + 1);
      } else {
        setCurrentVote(type);
        if (type === "LIKE")
          setLikesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === "UNLIKE")
          setLikesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });
  return (
    <div className="absolute z-10 bottom-2 left-2 flex gap-2">
      <button className="" onClick={() => vote("LIKE")}>
        <BiSolidLike />
      </button>
      <button className="" onClick={() => vote("UNLIKE")}>
        <BiSolidDislike />
      </button>
      <h1>{likesAmt}</h1>
    </div>
  );
};
