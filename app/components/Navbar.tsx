import Link from "next/link";
import { AuthLinks } from "./AuthLinks";

export const Navbar = () => {
  return (
    <div className="navbar p-5 sticky top-0 z-50 bg-neutral-900  flex justify-between ">
      <div className="">
        <h1 className="text-xl font-bold">BLOG</h1>
      </div>
      <div className="flex gap-2">
        <Link href="/">Home</Link>
        <Link href="/">Contact</Link>
        <Link href="/">About</Link>
        <Link href="/search">Search</Link>
        <AuthLinks />
      </div>
    </div>
  );
};
