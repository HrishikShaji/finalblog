"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaPen } from "react-icons/fa";
import { IoLogOut, IoLogIn } from "react-icons/io5";

export const AuthLinks = () => {
  const { status } = useSession();
  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login">
          <IoLogIn size={20} className="sm:hidden" />
          <h1 className="hidden sm:block">Login</h1>
        </Link>
      ) : (
        <>
          <Link href="/create">
            <FaPen size={20} className="sm:hidden" />
            <h1 className="hidden sm:block">Create</h1>
          </Link>
          <div onClick={() => signOut()}>
            <IoLogOut size={25} className="sm:hidden" />
            <h1 className="hidden sm:block">Logout</h1>
          </div>
        </>
      )}
    </>
  );
};
