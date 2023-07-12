import React from "react";
import { ImHome, ImStatsDots } from "react-icons/im";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { FaSearch, FaEnvelope, FaRegBell } from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";
import profile from '../assets/user.png'

function Sidbar() {
  const menus = [
    { name: "Dashboard", link: "/sidebar", icon: MdOutlineDashboard },
    { name: "Home", link: "table", icon: ImHome },
    { name: "messages", link: "chat", icon: FiMessageSquare },
    { name: "analytics", link: "/dd", icon: TbReportAnalytics, margin: true },
    { name: "File Manager", link: "/rr", icon: FiFolder },
    { name: "Cart", link: "/rr", icon: FiShoppingCart },
    { name: "Saved", link: "/vv", icon: AiOutlineHeart, margin: true },
    { name: "Setting", link: "/ww", icon: RiSettings4Line },
  ];

  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(false);

  const location = useLocation();

  const showProfile = () => {
    setOpen1(!open1);
  };

  return (
    <>
      <div className="flex">
        {/* sidebar */}
        <div
          className={`bg-purple-700 min-h-screen fixed ${
            open ? "w-[20%] " : "w-[5%]"
          } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={`${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md ${
                  location.pathname === menu?.link ? "bg-gray-800" : ""
                }`}
              >
                <div>{menu?.icon && <menu.icon size="20" />}</div>
                <h2
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>

        {/* main content */}
        <div
          className={`flex flex-col flex-grow ${
            open ? "ml-[250px] duration-500" : "ml-[60px] duration-500"
          }`}
        >
          {/* navbar */}
          <div className="flex items-center justify-between h-[60px] shadow-lg px-[25px]">
            <div className="flex items-center rounded-full">
              <input
                type="text"
                className="bg-gray-200 h-[40px] outline-none pl-[20px] w-[350px] rounded-l-full placeholder:text-base leading-[20px] font-normal"
                placeholder="Search"
              />
              <div className="bg-purple-700 h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-r-full">
                <FaSearch color="white" />
              </div>
            </div>
            <div className="flex items-center gap-[20px]">
              <div className="flex items-center gap-[25px] border-r-[1px] border-gray-400 pr-[25px]">
                <FaRegBell className="text-purple-600" />
                <FaEnvelope className="text-purple-600" />
              </div>
              <div
                className="flex items-center gap-[15px] relative"
                onClick={showProfile}
              >
                <p>Adnan Afzal</p>
                <div className="h-[50px] w-[50px] rounded-full bg-purple-500 cursor-pointer flex items-center justify-center relative z-40">
                  <img className="h-ful w-full p-2 rounded-full" src={profile} alt="" />
                </div>

                {open1 && (
                  <div className="bg-white border h-[120px] w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px] space-y-[10px]">
                    <p className="cursor-pointer hover:text-[blue] font-semibold">
                      Profile
                    </p>
                    <p className="cursor-pointer hover:text-[blue] font-semibold">
                      Settings
                    </p>
                    <Link
                      to="/"
                      className="cursor-pointer hover:text-[blue] font-semibold"
                    >
                      Log out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* content */}
          <div className="px-4 py-2 bg-gray-100">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidbar;
