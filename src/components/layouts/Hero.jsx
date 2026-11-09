import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center py-20 sm:py-24 lg:py-32">

        <div className="max-w-xl">


          <div className="inline-flex items-center gap-3 bg-[#F5F7FA] rounded-full px-5 py-2.5 mb-9">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F4B928]" />
            <span className="text-xs sm:text-sm font-semibold text-[#102B46] tracking-wide">
              Reliable Solar Energy Solutions
            </span>
          </div>


          <h1 className="text-[42px] sm:text-5xl lg:text-[58px] xl:text-[64px] leading-[1.13] font-extrabold text-[#102B46] tracking-tight">
            Powering a Brighter Future with{' '}
            <span className="text-[#D99A08]">
              Solar Energy.
            </span>
          </h1>


          <p className="mt-8 text-base sm:text-lg leading-8 text-slate-500 max-w-lg">
            Discover the work behind reliable energy. Explore our completed
            solar installations and see how we provide practical power
            solutions for homes, businesses and everyday needs.
          </p>


          <div className="flex flex-wrap items-center gap-4 mt-10">
            <Link
              to="/projects"
              className="primary-button group px-7 py-4"
            >
              Explore Our Projects
              <ArrowRight
                size={19}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/contact"
              className="secondary-button px-7 py-4"
            >
              Contact Us
            </Link>
          </div>

         
          <div className="mt-14 pt-7 border-t border-slate-100 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#F5F7FA] flex items-center justify-center shrink-0">
              <CheckCircle2
                size={21}
                className="text-[#102B46]"
              />
            </div>

            <div>
              <p className="text-sm font-bold text-[#102B46]">
                Quality you can see.
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Real projects. Reliable solar solutions.
              </p>
            </div>
          </div>
        </div>


        <div className="relative mt-6 lg:mt-0 lg:ml-2">


          <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#F4B928]/10 rounded-full blur-3xl" />

          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#102B46]/5 rounded-full blur-3xl" />


          <div className="relative h-[380px] sm:h-[480px] lg:h-[570px] xl:h-[620px] rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=85"
              alt="Solar panels installed on a rooftop"
              className="w-full h-full object-cover"
              fetchPriority="high"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#102B46]/25 via-transparent to-transparent" />
          </div>


          <div className="absolute -bottom-7 left-4 sm:left-8 lg:-left-8 bg-white shadow-xl border border-slate-100 rounded-xl p-5 sm:p-6 w-[250px] sm:w-[280px]">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Our commitment
            </p>

            <p className="text-xl font-bold text-[#102B46] mt-2">
              Reliable Energy
            </p>

            <p className="text-sm text-slate-500 leading-6 mt-2">
              Practical solar solutions designed to keep homes and businesses powered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
