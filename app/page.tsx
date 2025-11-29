"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
        
export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => router.push("admin/dashboard")}
      >
        Admin
      </Button>
    </div>
  );
}