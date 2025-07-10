import { Link } from "react-router";
import Logo from "../Shared/Logo/Logo";


const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-10 md:grid-cols-3">
        {/* Logo & Description */}
        <div className="space-y-2">
          <Logo />
          <p className="text-sm leading-relaxed">
            BookaPlay is your all-in-one sports club management platform. Easily book playtime, manage schedules, and connect with your club — all in one place.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-10">
          <div>
            <h3 className="font-semibold mb-2 text-primary">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/" className="hover:text-primary">Classes</Link></li>
              <li><Link to="/" className="hover:text-primary">Membership</Link></li>
              <li><Link to="/" className="hover:text-primary">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-primary">Support</h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2 text-primary">Contact</h3>
          <p className="text-sm">support@bookaplay.com</p>
          <p className="text-sm">+880 1234-567890</p>
          <p className="text-sm">Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-200 text-center py-4 text-sm">
        © {new Date().getFullYear()} BookaPlay. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
