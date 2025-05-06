import Link from "next/link";
import CircularProgress from "@/components/common/CircularProgress";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/lib/useLocalStorage";

export function ProfileCard({ progress }: { progress: number }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData: any = getLocalStorage("user");
    setUser(userData);
  }, []);

  return (
    <div className="py-4 px-5 rounded-lg w-full bg-[#0D6ACE]  shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)]">
      <div className="flex items-center space-x-4">
        <CircularProgress
          progress={progress}
          image="/images/circular-logo.png"
          size={53}
          strokeWidth={4}
        />
        <div className="flex flex-col justify-center items-center">
          <div>
            <h3 className="text-white  text-sm  font-semibold  leading-normal">
              {user ? user.firstName + " " + user.lastName : ""}
            </h3>
            <p className=" mt-1    w-full    text-white    text-xs   font-medium    leading-[17.5px]">
              Enhance your visibility in the Mineramax by complete Profile
            </p>
          </div>
          {/* <Link
            href={""}
            className="mt-2 w-full text-white text-xs font-bold leading-[17.5px] underline decoration-solid decoration-skip-ink-none decoration-auto underline-offset-auto underline-from-font"
          >
            View & Update Profile
          </Link> */}
        </div>
      </div>
    </div>
  );
}
