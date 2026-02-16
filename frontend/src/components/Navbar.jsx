import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-[#254F22] border-b border-[#EDE4C2]/20 sticky top-0 z-50">
      
      {/* Top bar */}
      <div className="h-16 px-6 md:px-12 flex justify-between items-center">

        <h1 className="text-xl font-semibold tracking-wide text-[#EDE4C2] cursor-pointer">
          BookStore
        </h1>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-10 items-center text-[#EDE4C2]/70 text-sm font-medium tracking-wide">
          <li className="cursor-pointer hover:text-[#F5824A] transition-colors">HOME</li>
          <li className="cursor-pointer hover:text-[#F5824A] transition-colors">ABOUT</li>
          <li className="cursor-pointer hover:text-[#F5824A] transition-colors">CONTACT</li>
        </ul>

        {/* Mobile button */}
        <button
          className="md:hidden text-[#EDE4C2] text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6">
          <ul className="flex flex-col gap-4 text-[#EDE4C2]/80 text-sm font-medium tracking-wide">
            <li className="cursor-pointer hover:text-[#F5824A]">HOME</li>
            <li className="cursor-pointer hover:text-[#F5824A]">ABOUT</li>
            <li className="cursor-pointer hover:text-[#F5824A]">CONTACT</li>
          </ul>
        </div>
      )}

    </div>
  );
};

export default Navbar;
