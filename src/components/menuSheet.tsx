"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./Layout/logo";
import useUserStore from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomerType } from "@/types/customerType";
import { UserInfo } from "./Users/UserInfo";
import { AdminPanel } from "./Admin/AdminPanel";
import { UserPlan } from "./Users/UserServices";
import { LogOut, Menu } from "lucide-react";
import { DialogProfile } from "./Dialogs/Dialog-profile";
import { getUsers } from "@/services/getApi";

export const MenuSheet = () => {
  const router = useRouter();
  const { user, clearUser } = useUserStore((state) => state);
  const [listUser, setListUser] = useState<CustomerType[]>([]);

  const getShortName = (fullName: string | undefined) => {
    if (!fullName) return "Usuário";
    const nameParts = fullName.split(" ");
    return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
  };

  useEffect(() => {
    async function fetchUsers() {
      const response = await getUsers();
      setListUser(response);
    }
    fetchUsers();
  }, []);

  const countPlanActive = listUser.filter(
    (item) => item.role === "USER"
  ).length;
  const countPlanInactive = listUser.filter(
    (item) => item.role === "USER"
  ).length;

  return (
    <>
      <Sheet>
        <SheetTrigger>{getShortName(user?.name)}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <div className="w-max m-auto py-10">
              <Logo />
            </div>
            <SheetTitle className="flex flex-wrap justify-between text-colorMark relative">
              {user?.name}
              <DialogProfile>
                <Menu className="cursor-pointer" />
              </DialogProfile>
            </SheetTitle>
            <SheetDescription>
              {user?.role === "USER" && (
                <>
                  <UserInfo />
                </>
              )}
            </SheetDescription>
            {user?.role === "ADMIN" && (
              <AdminPanel onAdminClick={() => router.push("/adm/dashboard")} />
            )}
            <UserPlan />
          </SheetHeader>
          <LogOut
            className="cursor-pointer absolute bottom-4 hover:text-yellowMark"
            onClick={() => clearUser()}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
