import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

const socialIcons = [
  { icon: FaFacebookF, link: "/" },
  { icon: FaTwitter, link: "/" },
  { icon: FaInstagram, link: "/" },
  { icon: FaLinkedinIn, link: "/" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("🎉 Thank you for subscribing! You'll hear from us soon.");
    setEmail("");
  };

  return (
    <footer className="bg-[#121212] py-16 px-16 text-gray-400 font-sans select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 mb-12">
          <div className="md:col-span-1">
            <h2 className="text-3xl font-extrabold text-orange-500 mb-4 tracking-wide">
              Foodie
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Discover delicious meals from all over the world. Find your next
              favorite recipe with us!
            </p>
            <div className="flex space-x-4 mt-6">
              {socialIcons.map(({ icon: Icon }, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                  aria-label="social link"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/countries"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Countries
                </a>
              </li>
              <li>
                <a
                  href="/favorites"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Favorites
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white mb-6">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Help & Support
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white mb-6">More</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 flex flex-col justify-start">
            <h4 className="text-xl font-semibold text-white mb-6">
              Subscribe to our newsletter
            </h4>
            <form onSubmit={handleSubscribe} className="w-full max-w-md flex">
              <input
                type="email"
                required
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-lg bg-gray-700 border-0 focus:ring-2 focus:ring-orange-500 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="p-6 rounded-r-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500 select-text">
          &copy; {new Date().getFullYear()} FoodieFinder.com — All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
