"use client";
import React from "react";
import SearchBox from "./search-box";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const tags = [
  { id: 0, name: "All", tag: "all" },
  { id: 1, name: "iPhone", tag: "iphone" },
  { id: 2, name: "MacBook", tag: "macbook" },
  { id: 3, name: "Air Pods Max", tag: "air pods max" },
];
const TagFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const tagParams = params.get("tag") || "all";

  const handleTagClick = (tag: string) => {
    if (tag === tagParams) {
      router.push(`?tag=${tagParams}`);
    } else {
      router.push(`?tag=${tag}`);
    }
  };

  return (
    <div className="flex items-center gap-2 justify-center text-sm font-medium mb-2">
      {tags.map((tag) => (
        <p
          key={tag.id}
          className={cn(
            "cursor-pointer border border-black rounded-md px-2 py-1",
            tagParams === tag.tag && "bg-primary text-white"
          )}
          onClick={() => handleTagClick(tag.tag)}
        >
          {tag.name}
        </p>
      ))}
    </div>
  );
};

export default TagFilter;
