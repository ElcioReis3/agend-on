"use client";
import { FormIn } from "@/components/authForm/formIn";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/auth/signup");
    router.prefetch("/adm/signin");
  }, []);
  return (
    <>
      <div className="w-full h-full my-7 flex justify-center">
        <div className="w-full max-w-xl min-h-96 flex flex-col items-center">
          <div className="font-bold text-xl py-3">LOGIN</div>
          <div className="w-full px-3">
            <FormIn />
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
