"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { createPost } from "@/actions";

const SHEET_SIDES = ["bottom"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export default function SheetSide() {
  const [role, setRole] = useState<string>("");
  const [proof, setProof] = useState<string>("");

  const handleSubmit = async () => {
    await createPost({ role, proof });
  };
  return (
    <Sheet>
      <SheetTrigger asChild={false}>
        <Input
          placeholder="Ask For A Referral"
          className="rounded-full h-[48px] mt-4 w-[250px] lg:w-[400px]"
        ></Input>
      </SheetTrigger>
      <SheetContent side={"bottom"}>
        <SheetHeader>
          <SheetTitle>Ask For A Referral</SheetTitle>
          <SheetDescription>Prove how you are gonna add value</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Role
            </Label>
            <Input
              onChange={(e) => setRole(e.target.value)}
              id="name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Why you ?
            </Label>
            <Input
              onChange={(e) => setProof(e.target.value)}
              id="username"
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleSubmit}>Post</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
