import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/auth.context";
import { useParams } from "react-router-dom";
import { IUser } from "../../../../hooks/type";
import { Heading, Image } from "../../../../components/ui";
import { Size } from "../../../../libs/utils/type.d";
import { ConfirmedIcon } from "../../../../assets";
import cn from "../../../../libs/utils/cn";

const UserProfilePage: React.FC = () => {
  const { userId } = useParams();
  const { fetchUserConfirmed } = useContext(AuthContext);
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const init = async () => {
    const userFetch = await fetchUserConfirmed(userId);
    setUser(userFetch?.user);
    setIsSubscribing(userFetch?.isSubscribing);
  };
  useEffect(() => {
    if (userId !== undefined) {
      init();
    }
  }, [userId]);
  const subscribeBtnHandle = () => {
    if (isSubscribing) {
      return;
    }
  };
  return (
    <main className="min-h-screen max-h-screen ">
      <section className="relative flex justify-center items-center bg-bg-container-color lg:h-60 rounded-xl">
        <div
          className="absolute inset-0 bg-cover bg-center rounded-2xl blur-md"
          style={{
            backgroundImage: `url(${user?.imageURL})`,
          }}
        />
        <div className="relative  lg:absolute lg:-bottom-20 flex flex-col items-center lg:flex-row lg:items-end w-full py-5">
          <img
            src={user?.imageURL}
            className="rounded-full lg:w-40 lg:h-40 w-36 h-36 object-cover"
            alt="User"
          />
          <div className="flex flex-col justify-start space-y-2">
            <div className="flex justify-center items-center space-x-1">
              <Heading value={user?.fullName} size={Size.XL} />
              <Image src={ConfirmedIcon} className="w-6 h-6" />
            </div>
            <button
              onClick={subscribeBtnHandle}
              className={cn(" px-4 py-2 rounded-full font-bold", {
                "bg-bg-container-color": isSubscribing,
                "bg-white text-bg-color": !isSubscribing,
              })}
            >
              {isSubscribing ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserProfilePage;
