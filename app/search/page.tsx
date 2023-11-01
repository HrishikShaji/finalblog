"use client";

import { ExtendedPost } from "@/types/types";
import { useState } from "react";
import { CustomDropdown } from "../components/CustomDropdown";
import { categoryValues, sortValues } from "@/app/lib/data";
import { PostImage } from "../components/PostImage";
import { SearchBar } from "../components/SearchBar";
import { User } from "../components/User";

const Page = () => {
  const [finalResults, setFinalResults] = useState<ExtendedPost[]>([]);
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="min-h-screen w-full pt-10  flex flex-col gap-2 items-center">
      <SearchBar
        finalResults={finalResults}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setFinalResults={setFinalResults}
      />
      <div className="w-full flex flex-col gap-5">
        {finalResults.length > 0 && (
          <div className="flex gap-2 justify-center">
            <CustomDropdown
              setFinalResults={setFinalResults}
              inputValue={inputValue}
              values={sortValues}
              type="sort"
            />
            <CustomDropdown
              setFinalResults={setFinalResults}
              inputValue={inputValue}
              values={categoryValues}
              type="filter"
            />
          </div>
        )}
        <div className="flex flex-col gap-4">
          {finalResults.map((post: ExtendedPost) => {
            const content = post.content as any;
            const desc = content.blocks.filter(
              (block: any) => block.type == "paragraph",
            );
            return (
              <div key={post.id} className="w-full flex flex-col gap-2">
                <div className="flex gap-2">
                  <PostImage content={post.content} size="medium" />
                  <div>
                    <h1>{post.title}</h1>
                    <h1>{desc.data?.text}</h1>
                    <h1>{post.votes.length}</h1>
                    <h1>{post.catSlug}</h1>
                  </div>
                </div>
                {post.user.image && (
                  <User
                    image={post.user.image}
                    email={post.userEmail}
                    date={post.createdAt}
                    size="small"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
