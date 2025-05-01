"use client";
import { FormUp } from "@/components/authForm/formUp";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/auth/signin");
  }, []);
  return (
    <>
      <div className="w-full h-full my-7 flex justify-center">
        <div className="w-full max-w-xl min-h-96 flex flex-col items-center">
          <div className="font-bold text-xl py-3">CADASTRAR</div>
          <div className="w-full px-3">
            <FormUp />
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
