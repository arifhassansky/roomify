const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16">
      <div className="container mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div>
            <h2 className="text-4xl font-bold mb-4 font-secondary">Roomify</h2>
            <p className="text-lg">
              Experience the finest rooms for your relaxation. Join Roomify for
              a luxurious stay and unmatched comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4 font-secondary">
              Quick Links
            </h3>
            <ul>
              <li>
                <a
                  href="/"
                  className="hover:text-secondary transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/rooms"
                  className="hover:text-secondary transition duration-300"
                >
                  Rooms
                </a>
              </li>
              <li>
                <a
                  href="/my-bookings"
                  className="hover:text-secondary transition duration-300"
                >
                  My Bookings
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-secondary transition duration-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="lg:flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4 font-secondary">
              Follow Us On
            </h3>
            <div className="flex mt-2 gap-2">
              <a
                href="https://www.facebook.com/arifhearthacker/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <img
                  src="https://i.ibb.co.com/swKMGKv/2021-Facebook-icon-svg.png"
                  alt="Facebook"
                  className="w-8 h-8 rounded-full"
                />
              </a>
              <a
                href="https://x.com/arifskypro"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <img
                  src="https://i.ibb.co.com/3Yd0c93/free-twitter-logo-icon-2429-thumb.png"
                  alt="Twitter"
                  className="w-8 h-8 rounded-full"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/arif-hassan-8a4642317/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <img
                  src="https://i.ibb.co.com/b1Tvsq6/linkedin.webp"
                  alt="LinkedIn"
                  className="w-8 h-8 rounded-full"
                />
              </a>
              <a
                href="https://www.instagram.com/ariyan_sky/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <img
                  src="https://i.ibb.co.com/phDPkf7/instrgram.png"
                  alt="Instagram"
                  className="w-8 h-8 rounded-full"
                />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 font-secondary">
              Contact
            </h3>
            <ul>
              <li>
                <p>Email: support@roomify.com</p>
              </li>
              <li>
                <p>Phone: +123 456 7890</p>
              </li>
              <li>
                <p>Address: 123 Roomify St, V10, Dhaka, Bangladesh</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-4 bg-[#392380] px-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">© 2024 Roomify. All Rights Reserved.</p>
          </div>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-secondary">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-secondary">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
