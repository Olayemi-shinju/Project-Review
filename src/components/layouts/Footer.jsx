import { ArrowUpRight, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#102B46] text-white">
      <div className="container py-14 sm:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Sun size={23} className="text-[#F4B928]" />
              </div>

              <div>
                <h2 className="font-extrabold text-xl tracking-tight">
                  QUICKVIEW
                </h2>

                <p className="text-[9px] font-semibold tracking-[2px] text-slate-300">
                  SOLAR PROJECTS
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-7 mt-6 max-w-sm">
              Showcasing our completed solar installations and
              practical energy solutions for homes and businesses.
            </p>
          </div>

       
          <div>
            <h3 className="font-bold text-base mb-6">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4 text-sm text-slate-300">
              <Link to="/" className="hover:text-[#F4B928] transition-colors">
                Home
              </Link>

              <Link to="/projects" className="hover:text-[#F4B928] transition-colors">
                Our Projects
              </Link>

              <Link to="/about" className="hover:text-[#F4B928] transition-colors">
                About Us
              </Link>

              <Link to="/contact" className="hover:text-[#F4B928] transition-colors">
                Contact
              </Link>
            </div>
          </div>

     
          <div>
            <h3 className="font-bold text-base mb-6">
              Get in Touch
            </h3>

            <p className="text-sm text-slate-300 leading-7">
              Interested in our work or need more information about
              our solar solutions?
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#F4B928] mt-5 hover:gap-3 transition-all"
            >
              Contact Our Team
              <ArrowUpRight size={17} />
            </Link>
          </div>

        </div>

  
        <div className="border-t border-white/10 mt-14 pt-7 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Aod Solartricity. All rights reserved.
          </p>

          <p className="text-xs text-slate-400">
            Solar projects. Real work. Reliable solutions.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
