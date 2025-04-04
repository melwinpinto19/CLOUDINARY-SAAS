"use client";
import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function Navbar() {
  const { user } = useUser();
  return (
    <div className="navbar bg-base-100 shadow-sm h-[50px]">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Cloudinary Saas</a>
      </div>
      <div className="flex-1">
        <ul className="menu menu-horizontal p-0">
          <li className="text-[16px] font-md">
            <Link href="/home">Home</Link>
          </li>
          <li className="text-[16px] font-md">
            <Link href="/home/social-share">Social share</Link>
          </li>
          <li className="text-[16px] font-md">
            <Link href="/home/video-upload">Video upload</Link>
          </li>
        </ul>
      </div>
      <div className="flex-none">
        {user?.emailAddresses[0].emailAddress}
        <button className="btn btn-square btn-ghost" disabled>
          <UserButton />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
