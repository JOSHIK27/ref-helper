"use client";
import { posts } from "@/store/recoil";
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

import { useRecoilValue } from "recoil";
import { PostCard } from "./postCard";
export default function PostCardsList() {
  const postsList = useRecoilValue(posts);

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
            type="Post"
          />
        );
      })}
    </>
  );
}
