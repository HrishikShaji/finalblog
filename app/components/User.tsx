import Image from "next/image";
import { formatTimeToNow } from "../lib/utils";

interface UserProps {
  image: string;
  email: string;
  date: Date;
}

export const User: React.FC<UserProps> = ({ image, email, date }) => {
  return (
    <div className="flex gap-2 absolute z-10  top-2 left-2">
      <Image
        className="object-cover  w-12 h-12"
        height={1000}
        width={1000}
        alt="image"
        src={image}
      />
      <div className="flex flex-col gap-0">
        <h1 className="font-semibold">{email}</h1>
        <span className="text-xs">{formatTimeToNow(new Date(date))}</span>
      </div>
    </div>
  );
};
