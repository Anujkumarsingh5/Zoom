"use client";
import React from "react";
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
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "../../constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="hamburger icon"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-[#1C1F2E] text-white">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="Zoom logo"
              className="max-sm:size-10"
            />

            <p className="text-[26px] font-extrabold text-white ">Zoom</p>
          </Link>

          {/* for other links like meetings, home, recordingds.. */}
          <div className="flex h-[calc(100vh-72px) flex-col justify-between overflow-y-auto]">
            <SheetClose>
              <section className="flex h-full flex-col gap-6 pt-16 text-white ">
                {sidebarLinks.map((link) => {
                  const isActive =
                    pathname === link.route ||
                    (link.route !== "/" && pathname.startsWith(link.route));

                  return (
                    <Link
                      href={link.route}
                      key={link.label}
                      className={cn(
                        "flex items-center gap-4 rounded-lg p-4 w-full max-w-60",
                        { "bg-[#2646d4]": isActive },
                      )}
                    >
                      <Image
                        src={link.imgUrl}
                        alt={link.label}
                        width={20}
                        height={20}
                        style={{ width: "24px", height: "24px" }}
                      />
                      <p className="font-semibold ">{link.label}</p>
                    </Link>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
