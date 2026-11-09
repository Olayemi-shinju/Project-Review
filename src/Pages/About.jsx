import { ArrowRight, Sun, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layouts/NavBar';
import Footer from '../components/layouts/Footer';

function About() {
  return (
    <>
      <Navbar />

      <main>
    
        <section className="bg-[#F5F7FA] py-20 sm:py-24">
          <div className="container">
            <p className="text-sm font-semibold text-[#D99A08] uppercase tracking-wider mb-4">
              About Us
            </p>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#102B46] tracking-tight">
              Powering Better Energy Experiences
            </h1>

            <p className="text-slate-500 leading-8 mt-5 max-w-2xl">
              Get to know our company, our work and our commitment
              to providing practical solar energy solutions.
            </p>
          </div>
        </section>

      
        <section className="section-padding bg-white">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            <div className="h-[350px] sm:h-[480px] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&q=85"
                alt="Solar energy installation"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#D99A08] uppercase tracking-wider mb-4">
                Who We Are
              </p>

              <h2 className="section-title">
                Making Solar Energy Work for Everyday Life.
              </h2>

              <p className="text-slate-500 leading-8 mt-6">
                We are committed to delivering practical solar energy
                solutions for residential and commercial needs.
                Our work focuses on dependable installations and
                solutions designed around the needs of each project.
              </p>

              <p className="text-slate-500 leading-8 mt-4">
                Through our completed projects, we aim to demonstrate
                the quality of our work and help clients understand
                the solutions we provide.
              </p>

              <Link to="/projects" className="primary-button mt-8">
                Explore Our Projects
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

     
        <section className="bg-[#F5F7FA] section-padding">
          <div className="container">

            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="section-title">
                What Matters to Us
              </h2>

              <p className="section-description mx-auto mt-4">
                The principles that guide our approach to every project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-white rounded-xl p-7 border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-[#F5F7FA] flex items-center justify-center">
                  <ShieldCheck size={24} className="text-[#102B46]" />
                </div>

                <h3 className="text-lg font-bold text-[#102B46] mt-5">
                  Quality Work
                </h3>

                <p className="text-sm text-slate-500 leading-7 mt-3">
                  We value careful work and attention to detail in
                  every solar installation.
                </p>
              </div>

              <div className="bg-white rounded-xl p-7 border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-[#F5F7FA] flex items-center justify-center">
                  <Zap size={24} className="text-[#102B46]" />
                </div>

                <h3 className="text-lg font-bold text-[#102B46] mt-5">
                  Reliable Solutions
                </h3>

                <p className="text-sm text-slate-500 leading-7 mt-3">
                  We focus on practical energy solutions that
                  meet the needs of our clients.
                </p>
              </div>

              <div className="bg-white rounded-xl p-7 border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-[#F5F7FA] flex items-center justify-center">
                  <Sun size={24} className="text-[#102B46]" />
                </div>

                <h3 className="text-lg font-bold text-[#102B46] mt-5">
                  Clean Energy
                </h3>

                <p className="text-sm text-slate-500 leading-7 mt-3">
                  We believe in the value of solar energy as
                  an alternative power solution.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default About;
