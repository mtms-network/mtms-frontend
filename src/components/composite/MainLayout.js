import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          <div className="w-full navbar bg-dark-base">
            <div className="flex-none lg:hidden">
              <label for="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
              <div>
                <ul class="menu menu-horizontal p-0 flex flex-row justify-start">
                  <li>
                    <a className="font-bold text-lg">Home</a>
                  </li>
                  <li>
                    <a className="font-bold text-lg">Products</a>
                  </li>
                  <li>
                    <a className="font-bold text-lg">MTMS Farmer</a>
                  </li>
                  <li>
                    <a className="font-bold text-lg">NFT Marketplace</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-none hidden lg:block ">
              <div className="menu menu-horizontal space-x-3 py-4">
                <div>
                  <button class="btn btn-primary gap-2 text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Buy MTMS
                  </button>
                </div>
                <div className="flex flex-row justify-center items-center space-x-2">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src="https://api.lorem.space/image/face?hash=28212" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Michael Jordan</p>
                  </div>
                </div>
                <button className="btn btn-primary text-lg">English</button>
              </div>
            </div>
          </div>
          <div className="bg-white w-full h-full overflow-scroll p-4">{children}</div>
        </div>
        <div className="drawer-side bg-dark-base">
          <label for="my-drawer-3" className="drawer-overlay" />
          <div className="menu py-4 px-8 overflow-y-auto w-80 bg-dark-base">
            <div>
              <img src="/images/mtms-logo.png" alt="logo" />
            </div>
            <div className="pt-8 space-y-8">
              <div className="w-full">
                <button className="text-base font-normal btn btn-base justify-start">Overview</button>
              </div>
              <div className="w-full">
                <button className="pl-4 text-base btn-link-dark justify-start">Schedule a Meeting</button>
              </div>
              <div className="w-full">
                <button className="pl-4 text-base btn-link-dark justify-start">Rooms 24/7</button>
              </div>
              <div className="w-full">
                <button className="pl-4 text-base btn-link-dark justify-start">Contacts</button>
              </div>
              <div className="w-full">
                <button className="pl-4 text-base btn-link-dark justify-start">Analytics</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
