import { useState } from 'react';
import { ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';
import Navbar from '../components/layouts/NavBar';
import Footer from '../components/layouts/Footer';
import ProjectCard from '../components/projects/ProjectCards';

const projects = [
  {
    id: 1,
    slug: 'residential-solar-installation',
    title: 'Residential Solar Installation',
    location: 'Akure, Ondo State',
    description: 'A residential solar installation designed to provide dependable electricity and reduce reliance on the public power supply.',
    coverImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=85',
  },
  {
    id: 2,
    slug: 'commercial-solar-system',
    title: 'Commercial Solar System',
    location: 'Lagos, Nigeria',
    description: 'A solar energy solution designed to support the daily power requirements of a commercial facility.',
    coverImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=900&q=85',
  },
  {
    id: 3,
    slug: 'solar-inverter-installation',
    title: 'Solar Inverter Installation',
    location: 'Ibadan, Oyo State',
    description: 'A neatly installed solar inverter and battery system built to provide reliable backup power.',
    coverImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=85',
  },
  {
    id: 4,
    slug: 'rooftop-solar-project',
    title: 'Rooftop Solar Project',
    location: 'Abuja, Nigeria',
    description: 'A rooftop solar system designed to harness clean energy and support everyday electricity needs.',
    coverImage: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&q=85',
  },
  {
    id: 5,
    slug: 'industrial-solar-installation',
    title: 'Industrial Solar Installation',
    location: 'Ogun State, Nigeria',
    description: 'A solar installation designed to support the energy requirements of an industrial facility.',
    coverImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&q=85',
  },
  {
    id: 6,
    slug: 'home-inverter-system',
    title: 'Home Inverter System',
    location: 'Ondo State, Nigeria',
    description: 'A home solar and inverter solution designed to provide dependable backup electricity.',
    coverImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=85',
  },
  {
    id: 7,
    slug: 'business-solar-installation',
    title: 'Business Solar Installation',
    location: 'Lagos, Nigeria',
    description: 'A solar energy installation for a business facility.',
    coverImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=900&q=85',
  },
  {
    id: 8,
    slug: 'solar-panel-project',
    title: 'Solar Panel Project',
    location: 'Akure, Ondo State',
    description: 'A solar panel installation designed for dependable electricity.',
    coverImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&q=85',
  },
  {
    id: 9,
    slug: 'residential-inverter-project',
    title: 'Residential Inverter Project',
    location: 'Abuja, Nigeria',
    description: 'A residential inverter installation providing an alternative power source.',
    coverImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=85',
  },
];

const PROJECTS_PER_PAGE = 6;

function Projects() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;

  const displayedProjects = projects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE
  );

  return (
    <>
      <Navbar />

      <main>
      
        <section className="bg-[#F5F7FA] py-20 sm:py-24">
          <div className="container">
            <p className="text-sm font-semibold text-[#D99A08] uppercase tracking-wider mb-4">
              Our Portfolio
            </p>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#102B46] tracking-tight">
              Our Projects
            </h1>

            <p className="text-slate-500 leading-8 mt-5 max-w-2xl">
              Explore our completed solar installations and discover
              the work, experience and solutions behind every project.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container">

            <div className="flex items-center justify-between mb-9">
              <div>
                <h2 className="text-xl font-bold text-[#102B46]">
                  Completed Projects
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Showing {startIndex + 1}–
                  {Math.min(startIndex + PROJECTS_PER_PAGE, projects.length)}
                  {' '}of {projects.length} projects
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
                <FolderOpen size={18} />
                Project Gallery
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {displayedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

  
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-16">

                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => page - 1)}
                  disabled={currentPage === 1}
                  className="w-11 h-11 rounded-lg border border-slate-200 flex items-center justify-center text-[#102B46] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F5F7FA] transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-11 h-11 rounded-lg text-sm font-semibold transition-colors ${
                      currentPage === page
                        ? 'bg-[#102B46] text-white'
                        : 'border border-slate-200 text-[#102B46] hover:bg-[#F5F7FA]'
                    }`}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => page + 1)}
                  disabled={currentPage === totalPages}
                  className="w-11 h-11 rounded-lg border border-slate-200 flex items-center justify-center text-[#102B46] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F5F7FA] transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight size={20} />
                </button>

              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Projects;
