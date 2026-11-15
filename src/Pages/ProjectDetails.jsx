
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  FolderOpen,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

import Navbar from '../components/layouts/NavBar';
import Footer from '../components/layouts/Footer';
import { getPublishedProjectBySlug } from '../firebase/services/projectServices';

function ProjectDetails() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(null);

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

  const openImage = (index) => {
    setActiveImage(index);
  };

  const closeImage = () => {
    setActiveImage(null);
  };

  const showPrevious = () => {
    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    if (activeImage === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeImage();
      if (e.key === 'ArrowLeft') showPrevious();
      if (e.key === 'ArrowRight') showNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeImage, images.length]);

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
            <section className="bg-[#F5F7FA] py-12 sm:py-16">
              <div className="container">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B46] hover:text-[#D99A08] mb-8"
                >
                  <ArrowLeft size={18} />
                  Back to Projects
                </Link>

                <div className="max-w-3xl">
                  {project.category && (
                    <p className="text-xs font-bold text-[#D99A08] uppercase tracking-widest mb-3">
                      {project.category}
                    </p>
                  )}

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102B46] tracking-tight">
                    {project.title}
                  </h1>

                  {project.location && (
                    <div className="flex items-center gap-2 text-slate-500 mt-5 text-sm">
                      <MapPin size={17} />
                      <span>{project.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="section-padding">
              <div className="container">
                {/* Cover Image */}
                {coverImage ? (
                  <button
                    type="button"
                    onClick={() => openImage(0)}
                    className="relative group block w-full max-w-5xl mx-auto overflow-hidden rounded-xl bg-[#F5F7FA]"
                  >
                    <img
                      src={coverImage}
                      alt={project.title}
                      className="w-full h-64 sm:h-80 lg:h-[380px] object-cover"
                    />

                    <span className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/95 text-[#102B46] text-xs font-semibold px-3 py-2 rounded-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={15} />
                      View image
                    </span>
                  </button>
                ) : (
                  <div className="max-w-5xl mx-auto rounded-xl bg-[#F5F7FA] h-64 flex items-center justify-center text-slate-400">
                    <FolderOpen size={40} />
                  </div>
                )}

                {/* Project Information */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 mt-12 sm:mt-16">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-[#102B46] mb-5">
                      About This Project
                    </h2>

                    <p className="text-slate-500 leading-8 whitespace-pre-line">
                      {project.description || 'No project description available.'}
                    </p>
                  </div>

                  <aside className="bg-[#F5F7FA] rounded-xl p-6 sm:p-7 h-fit">
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
                  </aside>
                </div>

                {/* Gallery */}
                {images.length > 1 && (
                  <section className="mt-16 sm:mt-20">
                    <div className="flex items-end justify-between gap-4 mb-7">
                      <div>
                        <h2 className="text-2xl font-bold text-[#102B46]">
                          Project Gallery
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">
                          Explore more photos from this installation.
                        </p>
                      </div>

                      <span className="text-xs text-slate-400 whitespace-nowrap">
                        {images.length} photos
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                      {images.slice(1).map((image, index) => (
                        <button
                          type="button"
                          key={`${image}-${index}`}
                          onClick={() => openImage(index + 1)}
                          className="relative group overflow-hidden rounded-lg bg-[#F5F7FA] text-left"
                        >
                          <img
                            src={image}
                            alt={`${project.title} - Image ${index + 2}`}
                            loading="lazy"
                            className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Maximize2
                              size={22}
                              className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* Video */}
                {project.videoUrl && (
                  <section className="mt-16">
                    <h2 className="text-2xl font-bold text-[#102B46] mb-5">
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
                  </section>
                )}

                {/* Contact CTA */}
                <section className="mt-16 sm:mt-20 bg-[#102B46] rounded-2xl p-8 sm:p-12 text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Interested in a Similar Project?
                  </h2>

                  <p className="text-slate-300 mt-4 leading-7 max-w-xl mx-auto">
                    Let our team help you find the right solar solution
                    for your home or business.
                  </p>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center mt-8 px-7 py-3 rounded-lg bg-[#F4B928] text-[#102B46] font-bold hover:bg-[#D99A08] transition-colors"
                  >
                    Contact Our Team
                  </Link>
                </section>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Image Lightbox */}
      {activeImage !== null && images[activeImage] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <button
            type="button"
            onClick={closeImage}
            aria-label="Close image viewer"
            className="absolute top-5 right-5 text-white hover:text-[#F4B928]"
          >
            <X size={30} />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous image"
              className="absolute left-3 sm:left-6 text-white hover:text-[#F4B928] bg-white/10 rounded-full p-2"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <img
            src={images[activeImage]}
            alt={`${project.title} - Image ${activeImage + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[85vh] object-contain"
          />

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-3 sm:right-6 text-white hover:text-[#F4B928] bg-white/10 rounded-full p-2"
            >
              <ChevronRight size={28} />
            </button>
          )}

          <span className="absolute bottom-5 text-white/80 text-sm">
            {activeImage + 1} / {images.length}
          </span>
        </div>
      )}
      <Footer />
    </>
  );
}

export default ProjectDetails;
