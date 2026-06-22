import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        {/* Brand Info */}
        <div className="w-4/5">
          <h2 className="text-2xl font-semibold text-gray-900">Cartify</h2>

          <p className="mt-6 text-sm leading-6">
            Cartify is your trusted destination for quality products across
            technology, fashion, and everyday essentials. We are committed to
            delivering a seamless shopping experience with secure payments,
            reliable service, and customer-first support.
          </p>
        </div>

        {/* Company Links */}
        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>

            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">
                  Home
                </a>
              </li>

              <li>
                <a className="hover:underline transition" href="#">
                  About Us
                </a>
              </li>

              <li>
                <a className="hover:underline transition" href="#">
                  Contact Us
                </a>
              </li>

              <li>
                <a className="hover:underline transition" href="#">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get In Touch</h2>

            <div className="text-sm space-y-2">
              <p>support@cartify.com</p>
              <p>contact@cartify.com</p>
              <p>Mon - Sat, 9:00 AM - 7:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <p className="py-4 text-center text-xs md:text-sm">
        © 2026 Cartify. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
