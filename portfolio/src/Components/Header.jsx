import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
const Header = () => {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navigation = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="relative w-full top-0 z-50 bg-gray-900 border-b border-gray-700">
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 py-4">
        <div className="flex items-center text-white">
          <div className="mr-2">
            <img src={logo} width={50} height={50} />
          </div>
          <div className="text-2xl font-semibold">Krish Coder</div>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="text-white"
          >
            ☰
          </button>
        </div>
        <nav
          className={`${
            isNavOpen ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-blue-500 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-[1.25rem] lg:font-semibold ${
                  item.url === location.hash
                    ? "z-2 lg:text-blue-500"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-blue-500 xl:px-12`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
