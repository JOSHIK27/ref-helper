"use client";

interface post {
  role: string;
  proof: string;
  imageUrl: string;
  visaExpiry: string;
  name: string;
  education: string;
  experience: string;
  country: string;
  type: string;
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
            name={item.name}
            education={item.education}
            experience={item.experience}
            country={item.country}
            type={item.type}
          />
        );
      })}
    </>
  );
}
