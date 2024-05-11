"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DownloadIcon } from "@radix-ui/react-icons";
export default function DownloadCVbtn() {
  const [details, setDetails] = useState<any>();
  useEffect(() => {
    fetch("api/getUserDetails", {
      method: "GET",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.json();
      })
      .then(({ details }) => {
        setDetails(details);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  return (
    <Button
      onClick={() => {
        const uint8Array = new Uint8Array(details?.file.data);
        const blob = new Blob([uint8Array], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "myresume.pdf";
        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(url);
      }}
      variant="outline"
      className="w-11/12 ml-4 mb-4"
    >
      Download CV
      <DownloadIcon className="ml-4" />
    </Button>
  );
}
