import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import ForEach from "../../libs/utils/foreach";
import { NavLink } from "react-router-dom";
import cn from "../../libs/utils/cn";

interface INavTopAdminRouter {
  to: string;
  title: string;
}
const listNav: INavTopAdminRouter[] = [
  {
    to: "/admin/home",
    title: "Home",
  },
  {
    to: "/admin/category",
    title: "Category",
  },
  {
    to: "/admin/country",
    title: "Country",
  },
];
const NavTopAdmin: React.FC = () => {
  const { userCurrent } = useContext(AuthContext);
  return (
    <header className="bg-bg-container-color h-16 w-full px-2">
      <div className="h-full w-full lg:w-[1024px] flex justify-between items-center mx-auto text-white">
        <h1 className="text-xl font-bold">Admin Manager</h1>
        <nav>
          <ul className="flex justify-center items-center space-x-5 font-semibold">
            <ForEach
              list={listNav}
              render={(_: number, item: INavTopAdminRouter) => (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn({
                      "text-primary-content-color": isActive,
                    })
                  }
                >
                  {item.title}
                </NavLink>
              )}
            />
          </ul>
        </nav>
        <div className="text-lg font-semibold">{userCurrent?.fullName}</div>
      </div>
    </header>
  );
};

export default NavTopAdmin;
