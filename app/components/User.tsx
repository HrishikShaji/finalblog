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
    <div className="flex gap-2 items-center">
      <Image
        className={cn("object-cover", {
          "w-8 h-8 sm:w-12 sm:h-12": size === "medium",
          "w-6 h-6 sm:w-10 sm:h-10": size === "small",
        })}
        height={1000}
        width={1000}
        alt="image"
        src={image}
      />
      <div className="flex flex-col gap-0">
        <h1 className="font-semibold text-sm sm:text-md">{email}</h1>
        <span className="text-xs">{formatTimeToNow(new Date(date))}</span>
      </div>
    </div>
  );
};
