"use client";

import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { ExtendedPost } from "@/types/types";
import { useState } from "react";
import { CustomDropdown } from "../components/CustomDropdown";
import { categoryValues, sortValues } from "@/app/lib/data";
import { PostImage } from "../components/PostImage";
import { SearchBar } from "../components/SearchBar";
import { User } from "../components/User";
import { getDesc } from "../lib/utils";
import Link from "next/link";

const Page = () => {
  const [finalResults, setFinalResults] = useState<ExtendedPost[]>([]);
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="min-h-screen w-full pt-10 p-10 sm:p-0 sm:p-10 flex flex-col gap-2 items-center">
      <SearchBar
        finalResults={finalResults}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setFinalResults={setFinalResults}
      />
      <div className="w-full flex flex-col gap-5 ">
        {finalResults.length > 0 && (
          <div className="flex gap-2 justify-center">
            <CustomDropdown
              setFinalResults={setFinalResults}
              inputValue={inputValue}
              values={sortValues}
              type="sort"
              title="Sort"
            />
            <CustomDropdown
              setFinalResults={setFinalResults}
              inputValue={inputValue}
              values={categoryValues}
              type="filter"
              title="Filter"
            />
          </div>
        )}
        <div className="flex flex-col gap-4 w-full">
          {finalResults.map((post: ExtendedPost) => {
            const desc = getDesc(post.content);
            console.log(desc);
            return (
              <div key={post.id} className="w-full flex flex-col gap-2 group">
                <div className="flex gap-2 w-full">
                  <div className="w-60 sm:w-[30%] h-32 sm:h-40 relative flex justify-center items-center">
                    <div className="h-full w-full absolute hidden group-hover:block bg-black/50"></div>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="absolute hidden group-hover:block z-30 "
                    >
                      <BsFillArrowUpRightCircleFill size={30} className="" />
                    </Link>
                    <PostImage content={post.content} size="large" />
                  </div>
                  <div className="w-[80%]">
                    <div className="hidden sm:block">
                      {post.user.image && (
                        <User
                          image={post.user.image}
                          email={post.userEmail}
                          date={post.createdAt}
                          size="small"
                        />
                      )}
                    </div>
                    <h1 className="font-semibold text-xl">{post.title}</h1>
                    <h1>{desc ? desc : ""}</h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
