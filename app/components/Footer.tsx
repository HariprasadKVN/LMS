import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 p-4 text-center text-white">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} LMS</p>
       {/*  <div className="mt-2">
          <a href="#" className="mx-2 text-gray-400 hover:text-white">
            Privacy Policy
          </a>
          <span className="text-gray-400">|</span>
          <a href="#" className="mx-2 text-gray-400 hover:text-white">
            Terms of Service
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
