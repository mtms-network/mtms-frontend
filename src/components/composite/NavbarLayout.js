import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

const NavbarLayout = ({ width, onLogout }) => {
  return (
    <div
      className="navbar bg-dark-base fixed z-10 h-18"
      style={{ width: `calc(${width}px - 320px)` }}
    >
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          <IoMenu />
        </label>
      </div>
      <div className="flex-1 px-2 mx-2 hidden lg:block">
        <div>
          <ul className="menu menu-horizontal p-0 flex flex-row justify-start">
            <li className="nav-link">
              <a className="font-bold text-base">Home</a>
            </li>
            <li className="nav-link">
              <a className="font-bold text-base">Products</a>
            </li>
            <li className="nav-link">
              <a className="font-bold text-base">MTMS Farmer</a>
            </li>
            <li className="nav-link">
              <a className="font-bold text-base">NFT Marketplace</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-none hidden lg:block px-4">
        <div className="menu menu-horizontal space-x-3 py-4">
          <div>
            <button className="btn btn-primary gap-2 text-base">
              <FaPlusCircle />
              Buy MTMS
            </button>
          </div>
          <div className="flex flex-row justify-center items-center space-x-2">
            <div className="dropdown dropdown-end bg-dark-base">
              <label
                tabIndex="0"
                className="hover:cursor-pointer flex flex-row space-x-2 justify-center items-center"
              >
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://api.lorem.space/image/face?hash=28212" alt="avatar" />
                  </div>
                </div>
                <div className="nav-link">
                  <p className="font-bold text-base">Michael Jordan</p>
                </div>
              </label>
              <ul
                tabIndex="0"
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-dark-base rounded-box w-32"
              >
                <li className="w-full">
                  <a className="btn btn-block hover:text-primary">Profile</a>
                </li>
                <li className="w-full">
                  <a className="btn btn-block hover:text-primary">Settings</a>
                </li>
                <li className="w-full">
                  <a className="btn btn-block hover:text-primary" onClick={onLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <button className="btn btn-primary text-base">English</button>
        </div>
      </div>
    </div>
  );
};

export default NavbarLayout;
