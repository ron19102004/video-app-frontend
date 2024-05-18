import React, { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../../../../../contexts/auth.context";
import { navigation } from "../../../../router";
import { NavLink, Outlet } from "react-router-dom";
import { Heading, Image } from "../../../../../components/ui";
import { ConfirmedIcon } from "../../../../../assets";
import { Size } from "../../../../../libs/utils/type.d";
import ForEach from "../../../../../libs/utils/foreach";
import cn from "../../../../../libs/utils/cn";
interface ITabNavPersonProfileProps {
  href: string;
  title: string;
}
const tabNav: ITabNavPersonProfileProps[] = [
  {
    href: `/profile/info`,
    title: "Information",
  },
  {
    href: `/profile/playlists`,
    title: "Playlists",
  },
  {
    href: `/profile/videos`,
    title: "Videos",
  },
];
const MyProfileLayout: React.FC = () => {
  const { isAuthenticated, userCurrent } = useContext(AuthContext);
  useEffect(() => {
    if (isAuthenticated === false) {
      navigation("/auth/login");
    }
  }, []);
  return (
    <main className="min-h-screen max-h-screen ">
      {userCurrent ? (
        <Fragment>
          <section className="relative flex justify-center items-center lg:h-60 rounded-xl">
            <div
              className="absolute inset-0 bg-cover bg-center rounded-2xl blur-md"
              style={{
                backgroundImage: `url(${userCurrent?.imageURL})`,
              }}
            />
            <div className="relative  lg:absolute lg:-bottom-20 flex flex-col items-center lg:flex-row lg:items-end w-full py-5">
              <Image
                src={userCurrent?.imageURL}
                className="rounded-full lg:w-40 lg:h-40 w-36 h-36 object-cover"
                alt="User"
              />
              <div className="flex flex-col justify-start space-y-2">
                <div className="flex justify-center items-center space-x-1">
                  <Heading value={userCurrent?.fullName} size={Size.XL} />
                  {userCurrent?.confirmed ? (
                    <Image src={ConfirmedIcon} className="w-6 h-6" />
                  ) : null}
                </div>
              </div>
            </div>
          </section>
          <section className="pt-10 lg:pt-20">
            <ul className="py-3 flex justify-start items-center gap-3">
              <ForEach
                list={tabNav}
                render={(_index: number, item: ITabNavPersonProfileProps) => {
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

export default MyProfileLayout;
