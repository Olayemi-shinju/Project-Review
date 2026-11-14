
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';
import Navbar from '../components/layouts/NavBar';
import Footer from '../components/layouts/Footer';
import ProjectCard from '../components/projects/ProjectCards';
import { getPublishedProjects } from '../firebase/services/projectServices';

const PROJECTS_PER_PAGE = 6;

function Projects() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getPublishedProjects();

        setProjects(
          data.map((project) => ({
            ...project,
            coverImage: project.coverImage || project.image,
          }))
        );
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Unable to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
                  {loading
                    ? 'Loading projects...'
                    : projects.length > 0
                      ? `Showing ${startIndex + 1}–${Math.min(
                          startIndex + PROJECTS_PER_PAGE,
                          projects.length
                        )} of ${projects.length} projects`
                      : 'Explore our completed installations'}
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
                <FolderOpen size={18} />
                Project Gallery
              </div>
            </div>

            {loading ? (
              <div className="py-20 text-center text-slate-500">
                Loading projects...
              </div>
            ) : error ? (
              <div className="py-20 text-center text-red-600">
                {error}
              </div>
            ) : projects.length === 0 ? (
              <div className="py-20 text-center">
                <FolderOpen
                  size={40}
                  className="mx-auto text-slate-300 mb-4"
                />

                <h3 className="text-lg font-semibold text-[#102B46]">
                  No projects available yet
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  Our completed projects will appear here soon.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                  {displayedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                    />
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

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (
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
                        aria-current={
                          currentPage === page ? 'page' : undefined
                        }
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
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Projects;
