"use client";

interface post {
  role: string;
  proof: string;
  imageUrl: string;
  visaExpiry: string;
}

type PropsType = {
  postsList: post[];
};

import { PostCard } from "./postCard";
export default function PostCardsList({ postsList }: PropsType) {
  return (
    <>
      {postsList.map((item: post) => {
        return (
          <PostCard
            key={item.imageUrl}
            role={item.role}
            imageUrl={item.imageUrl}
            proof={item.proof}
            visaExpiry={item.visaExpiry}
          />
        );
      })}
    </>
  );
}
