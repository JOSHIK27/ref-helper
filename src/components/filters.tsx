"use client";

import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { useRecoilState } from "recoil";
import { posts } from "@/store/recoil";
import { getUniquePropertyValues } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { daysFromToday } from "@/lib/utils";

export default function Filters() {
  const [totalPosts, setTotalPosts] = useState([]);
  const [selectAll, setSelectAll] = useState<boolean>(true);
  const [filteredRoles, setFilteredRoles] = useState<string[]>([]);
  const [filteredExperience, setFilteredExperience] = useState<string[]>([]);
  const [sortByVisaStatus, setSortByVisaStatus] = useState<boolean>(false);
  const [filteredPosts, setFilteredPosts] = useRecoilState(posts);

  useEffect(() => {
    fetch("/api/getAllPosts", {
      method: "GET",
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("Some error");
        return resp.json();
      })
      .then((posts) => {
        setTotalPosts(posts.posts);
        setFilteredPosts(posts.posts);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectAll) {
      const updatedPosts = totalPosts.filter(
        (item: post) =>
          filteredRoles.includes(item.role) &&
          filteredExperience.includes(item.experience)
      );
      if (sortByVisaStatus) {
        updatedPosts.sort(
          (a: post, b: post) =>
            daysFromToday(a.visaExpiry) - daysFromToday(b.visaExpiry)
        );
      }
      setFilteredPosts(updatedPosts);
    } else {
      if (sortByVisaStatus) {
        const updatedPosts = [...totalPosts];
        updatedPosts.sort(
          (a: post, b: post) =>
            daysFromToday(a.visaExpiry) - daysFromToday(b.visaExpiry)
        );
        setFilteredPosts(updatedPosts);
      } else {
        const updatedPosts = [...totalPosts];
        setFilteredPosts(updatedPosts);
      }
    }
  }, [filteredRoles, filteredExperience, selectAll, sortByVisaStatus]);

  if (!totalPosts.length) return <Skeleton />;

  const roles = getUniquePropertyValues(totalPosts, "role");
  const experience = getUniquePropertyValues(totalPosts, "experience");

  const handleFilteredRoles = (item: string) => {
    if (filteredRoles.includes(item)) {
      const updatedFilteredRoles = filteredRoles.filter((i) => i != item);
      setFilteredRoles(updatedFilteredRoles);
    } else {
      setFilteredRoles([...filteredRoles, item]);
    }
  };

  const handleFilteredExperience = (item: string) => {
    if (filteredExperience.includes(item)) {
      const updatedFilteredExperience = filteredExperience.filter(
        (i) => i != item
      );
      setFilteredExperience(updatedFilteredExperience);
    } else {
      setFilteredExperience([...filteredExperience, item]);
    }
  };

  return (
    <Card className=" w-80 fixed ml-12 mt-12 hidden shadow-md lg:inline-block">
      <div>
        <div className="flex items-center p-[12px]">
          <div className="font-semibold text-[#9D5C0D] text-xl mr-[4px]">
            All Posts
          </div>
          <Checkbox
            defaultChecked="indeterminate"
            onCheckedChange={(e: boolean) => {
              if (e) {
                if (sortByVisaStatus) {
                  const temp = [...totalPosts];
                  temp.sort(
                    (a: post, b: post) =>
                      daysFromToday(a.visaExpiry) - daysFromToday(b.visaExpiry)
                  );
                  setSelectAll(true);
                  setFilteredPosts(temp);
                } else {
                  setSelectAll(true);
                  setFilteredPosts(totalPosts);
                }
              } else {
                setSelectAll(false);
              }
            }}
          />
        </div>
        <Separator />

        <div className="p-[12px]">
          <div className="font-semibold text-[#9D5C0D] text-xl mr-[4px]">
            Sort By
          </div>
          <div className="flex items-center">
            <Checkbox
              className="mr-[8px]"
              onCheckedChange={(e: boolean) => setSortByVisaStatus(e)}
            />
            <span className="text-black font-semibold">Visa Status</span>
          </div>
        </div>
        <Separator />

        <div className="p-[12px]">
          <span className="font-semibold text-[#9D5C0D] text-xl">Role</span>
          {roles.map((item, index) => {
            return (
              <div key={index} className="flex items-center">
                <Checkbox
                  id="role"
                  className="mr-[8px]"
                  onClick={(e) => handleFilteredRoles(item)}
                />
                <span className="text-black font-semibold">{item}</span>
              </div>
            );
          })}
        </div>
        <Separator />
        <div className="p-[12px]">
          <span className="font-semibold text-[#9D5C0D] text-xl">
            Experience
          </span>
          {experience.map((item, index) => {
            return (
              <div key={index} className="flex items-center">
                <Checkbox
                  id="experience"
                  className="mr-[8px]"
                  onClick={(e) => handleFilteredExperience(item)}
                />
                <span className="text-black font-semibold">{item}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

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
