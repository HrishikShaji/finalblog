import Image from "next/image";
import { cn, formatTimeToNow } from "../lib/utils";

interface UserProps {
  image: string;
  email: string;
  date: Date;
  size: "small" | "medium";
}

export const User: React.FC<UserProps> = ({ image, email, date, size }) => {
  return (
    <div className="flex gap-2 ">
      <Image
        className={cn("object-cover", {
          "w-12 h-12": size === "medium",
          "w-10 h-10": size === "small",
        })}
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
