import React, { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/auth.context";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { IUser } from "../../../../hooks/type";
import { Heading, Image } from "../../../../components/ui";
import { Size } from "../../../../libs/utils/type.d";
import { ConfirmedIcon } from "../../../../assets";
import cn from "../../../../libs/utils/cn";
import toast, { EToastType } from "../../../../libs/utils/toast.util";
import ForEach from "../../../../libs/utils/foreach";
interface ITabNavUserProfileProps {
  href: string;
  title: string;
}
const tabNav = (userId: string | undefined): ITabNavUserProfileProps[] => {
  if (userId === undefined) {
    return [];
  }
  return [
    {
      href: `/user/${userId}/videos`,
      title: "Videos",
    },
    {
      href: `/user/${userId}/playlists`,
      title: "Playlist",
    },
  ];
};
const UserProfileLayout: React.FC = () => {
  const { uid } = useParams();
  const { fetchUserConfirmed, subscribe, unsubscribe } =
    useContext(AuthContext);
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [canUseSubscribeBtnHandle, setCanUseSubscribeBtnHandle] =
    useState<boolean>(true);
  const init = async () => {
    const userFetch = await fetchUserConfirmed(uid);
    setUser(userFetch?.user);
    setIsSubscribing(userFetch?.isSubscribing);
  };
  useEffect(() => {
    if (uid !== undefined) {
      init();
    }
  }, [uid]);
  const subscribeBtnHandle = async () => {
    if (!canUseSubscribeBtnHandle) {
      toast({
        type: EToastType.warning,
        message: "Please slow down your actions!",
      });
      return;
    }
    if (isSubscribing) {
      const status: boolean = await unsubscribe(user?.id);
      setIsSubscribing(!status);
      return;
    }
    const status: boolean = await subscribe(user?.id);
    setIsSubscribing(status);
    setCanUseSubscribeBtnHandle(false);
    setTimeout(() => {
      setCanUseSubscribeBtnHandle(true);
    }, 3000);
  };
  return (
    <main className="min-h-screen max-h-screen ">
      {user ? (
        <Fragment>
          <section className="relative flex justify-center items-center lg:h-60 rounded-xl">
            <div
              className="absolute inset-0 bg-cover bg-center rounded-2xl blur-md"
              style={{
                backgroundImage: `url(${user?.imageURL})`,
              }}
            />
            <div className="relative  lg:absolute lg:-bottom-20 flex flex-col items-center lg:flex-row lg:items-end w-full py-5">
              <Image
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
          <section className="pt-10 lg:pt-20">
            <ul className="py-3 flex justify-start items-center gap-3">
              <ForEach
                list={tabNav(uid)}
                render={(_index: number, item: ITabNavUserProfileProps) => {
                  return (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          "bg-bg-container-color px-4 py-2 rounded-2xl font-semibold",
                          {
                            "text-primary-content-color font-bold bg-white":
                              isActive,
                          }
                        )
                      }
                    >
                      {item.title}
                    </NavLink>
                  );
                }}
              />
            </ul>
            <div>
              <Outlet />
            </div>
          </section>
        </Fragment>
      ) : (
        <Fragment>Not found</Fragment>
      )}
    </main>
  );
};

export default UserProfileLayout;
