const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white text-center h-16 flex items-center justify-center">
        <p>
          © {new Date().getFullYear()} Content Management App. All rights
          reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
