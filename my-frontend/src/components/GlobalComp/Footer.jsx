import React from "react";
import {
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="responsivewidth space-y-8 py-16 lg:space-y-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-teal-600">
              <img
                src="/assets/logo1.png"
                className="size-[152px]"
                alt="logo"
                width={152}
                height={152}
              />
            </div>

            <p className="mt-4 max-w-xs line-clamp-4 justify-start text-white text-base font-light font-poppins">
              When Himalayan Khadu began its journey, it wasn't just about
              travel—it was about making dreams come alive. From the very first
              trek, we set out to be the link between wanderers and the wild,
              unexplored beauty of the Himalayas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            {/* Quick Links */}
            <div>
              <p className="text-neutral-50 text-base font-semibold font-poppins">
                Quick Links
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                {[
                  { label: "Home", href: "/" },
                  { label: "Destination", href: "/destinations" },
                  { label: "About", href: "/about" },
                  { label: "Packages", href: "/Package" },
                  { label: "Blog", href: "/Blog" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-neutral-50 text-base font-normal font-poppins"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <p className="text-neutral-50 text-base font-semibold font-poppins">
                Contact Information
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="text-neutral-50 flex gap-1 text-base font-normal font-poppins">
                  <Mail />
                  <span className="break-all">Himlyankhadu@gmail.com</span>
                </li>
                <li className="text-neutral-50 flex gap-1 text-base font-normal font-poppins">
                  <Phone />
                  <span className="break-all">7876750072</span>
                </li>
                <li className="text-neutral-50 flex gap-1 text-base font-normal font-poppins">
                  <MapPin />
                  <span className="break-all">
                    Himlayan Khadu 16 Miles, Shimla-Mandi National Highway,
                    Ghandal, District Shimla, Himachal Pradesh-171014.
                  </span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-neutral-50 text-base font-semibold font-poppins">
                Newsletters
              </p>
              <div className="mt-6 space-y-4 text-sm">
                <p className="text-neutral-50 text-base font-light font-poppins">
                  Be the first one to know all about the Exciting Offers, Travel
                  Updates and more.
                </p>
                <input
                  type="text"
                  className="justify-start py-3 my-4 px-[30px] border w-full rounded-[50px] text-white text-opacity-50 text-xs font-light font-poppins leading-tight tracking-tight"
                  placeholder="Enter your email address"
                />
                <div className="px-[30px] py-3 bg-[#0c8699] rounded-[35px] inline-flex justify-center items-center gap-2.5">
                  <div className="text-white text-base font-medium font-poppins">
                    Subscribe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex pt-8 justify-between items-center border-t border-white">
          <p className="text-neutral-50 text-xl font-normal font-lato leading-loose tracking-tight">
            &copy; Copyright 2025. All Rights Reserved.
          </p>
          <ul className="flex gap-6">
            {[Facebook, Instagram, Twitter, Github, Dribbble].map((Icon, i) => (
              <li key={i}>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-50 text-base font-normal font-poppins"
                >
                  <span className="sr-only">Social</span>
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
