
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  FolderOpen,
  ExternalLink,
} from 'lucide-react';

import Navbar from '../components/layouts/NavBar';
import Footer from '../components/layouts/Footer';
import { getPublishedProjectBySlug } from '../firebase/services/projectServices';

function ProjectDetails() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getPublishedProjectBySlug(slug);

        setProject(data);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setError('Unable to load this project. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  const coverImage = project?.coverImage || project?.image;

  const gallery = (project?.gallery || [])
    .map((item) => typeof item === 'string' ? item : item.url)
    .filter(Boolean);

  const images = [
    ...(coverImage ? [coverImage] : []),
    ...gallery.filter((image) => image !== coverImage),
  ];

  return (
    <>
      <Navbar />

      <main className="bg-white min-h-screen">
        {loading ? (
          <div className="container py-32 text-center text-slate-500">
            Loading project details...
          </div>
        ) : error ? (
          <div className="container py-32 text-center">
            <p className="text-red-600 mb-6">{error}</p>
            <Link
              to="/projects"
              className="text-[#102B46] font-semibold hover:text-[#D99A08]"
            >
              Back to Projects
            </Link>
          </div>
        ) : !project ? (
          <div className="container py-32 text-center">
            <h1 className="text-2xl font-bold text-[#102B46]">
              Project Not Found
            </h1>

            <p className="text-slate-500 mt-3">
              This project may have been removed or is no longer published.
            </p>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 mt-7 text-[#102B46] font-semibold hover:text-[#D99A08]"
            >
              <ArrowLeft size={18} />
              Back to Projects
            </Link>
          </div>
        ) : (
          <>
            <section className="bg-[#F5F7FA] py-16 sm:py-20">
              <div className="container">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B46] hover:text-[#D99A08] mb-10"
                >
                  <ArrowLeft size={18} />
                  Back to Projects
                </Link>

                <div className="max-w-3xl">
                  {project.category && (
                    <p className="text-sm font-semibold text-[#D99A08] uppercase tracking-wider mb-4">
                      {project.category}
                    </p>
                  )}

                  <h1 className="text-3xl sm:text-5xl font-extrabold text-[#102B46] tracking-tight">
                    {project.title}
                  </h1>

                  {project.location && (
                    <div className="flex items-center gap-2 text-slate-500 mt-6">
                      <MapPin size={18} />
                      <span>{project.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="section-padding">
              <div className="container">
                {coverImage ? (
                  <div className="rounded-2xl overflow-hidden bg-[#F5F7FA]">
                    <img
                      src={coverImage}
                      alt={project.title}
                      className="w-full max-h-[600px] object-cover"
                    />
                  </div>
                ) : (
                  <div className="rounded-2xl bg-[#F5F7FA] min-h-[300px] flex items-center justify-center text-slate-400">
                    <FolderOpen size={40} />
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-14">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-[#102B46] mb-6">
                      About This Project
                    </h2>

                    <p className="text-slate-500 leading-8 whitespace-pre-line">
                      {project.description || 'No project description available.'}
                    </p>
                  </div>

                  <div className="bg-[#F5F7FA] rounded-xl p-7 h-fit">
                    <h3 className="text-lg font-bold text-[#102B46] mb-6">
                      Project Information
                    </h3>

                    {project.category && (
                      <div className="mb-5">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                          Category
                        </p>
                        <p className="text-sm font-semibold text-[#102B46]">
                          {project.category}
                        </p>
                      </div>
                    )}

                    {project.location && (
                      <div className="mb-5">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                          Location
                        </p>
                        <p className="text-sm font-semibold text-[#102B46]">
                          {project.location}
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                        Status
                      </p>
                      <p className="text-sm font-semibold text-green-700">
                        Completed
                      </p>
                    </div>
                  </div>
                </div>

                {images.length > 1 && (
                  <div className="mt-16">
                    <h2 className="text-2xl font-bold text-[#102B46] mb-8">
                      Project Gallery
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {images.slice(1).map((image, index) => (
                        <div
                          key={`${image}-${index}`}
                          className="rounded-xl overflow-hidden bg-[#F5F7FA]"
                        >
                          <img
                            src={image}
                            alt={`${project.title} - Image ${index + 2}`}
                            loading="lazy"
                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {project.videoUrl && (
                  <div className="mt-16">
                    <h2 className="text-2xl font-bold text-[#102B46] mb-8">
                      Project Video
                    </h2>

                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#102B46] font-semibold hover:text-[#D99A08]"
                    >
                      Watch Project Video
                      <ExternalLink size={17} />
                    </a>
                  </div>
                )}

                <div className="mt-20 bg-[#102B46] rounded-2xl p-8 sm:p-12 text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Interested in a Similar Project?
                  </h2>

                  <p className="text-slate-300 mt-4 leading-7">
                    Let our team help you find the right solar solution
                    for your home or business.
                  </p>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center mt-8 px-7 py-3 rounded-lg bg-[#F4B928] text-[#102B46] font-bold hover:bg-[#D99A08] transition-colors"
                  >
                    Contact Our Team
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default ProjectDetails;
