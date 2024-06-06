import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="p-4 text-center bg-blue-950/90 text-white dark:text-black dark:bg-gradient-to-t dark:from-teal-100 dark:to-teal-300">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} LMS</p>
      </div>
    </footer>
  );
};

export default Footer;
