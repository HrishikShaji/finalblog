import Link from "next/link";
import { AuthLinks } from "./AuthLinks";
import { BiSolidHomeAlt2, BiSearch } from "react-icons/bi";

export const Navbar = () => {
  return (
    <div className="navbar p-5 sticky top-0 z-50 bg-neutral-900  flex justify-between ">
      <div className="">
        <h1 className="text-xl font-bold">BLOG</h1>
      </div>
      <div className="flex gap-4 items-center">
        <Link href="/">
          <BiSolidHomeAlt2 size={25} className="sm:hidden" />
          <h1 className="hidden sm:block">Home</h1>
        </Link>
        <Link href="/search">
          <BiSearch size={25} className="sm:hidden" />
          <h1 className="hidden sm:block">Search</h1>
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
};
