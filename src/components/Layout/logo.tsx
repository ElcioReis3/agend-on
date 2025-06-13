import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <div className="w-max h-full max-sm:h-14">
      <Link href="/">
        <Image src={"/images/logo.png"} alt="logo" width={130} height={130} />
      </Link>
    </div>
  );
};
