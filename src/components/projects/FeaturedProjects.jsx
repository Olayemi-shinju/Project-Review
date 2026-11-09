import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCards';

const sampleProjects = [
  {
    id: 1,
    slug: 'residential-solar-installation',
    title: 'Residential Solar Installation',
    location: 'Akure, Ondo State',
    description:
      'A residential solar installation designed to provide dependable electricity and reduce reliance on the public power supply.',
    coverImage:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=85',
  },
  {
    id: 2,
    slug: 'commercial-solar-system',
    title: 'Commercial Solar System',
    location: 'Lagos, Nigeria',
    description:
      'A solar energy solution designed to support the daily power requirements of a commercial facility.',
    coverImage:
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=900&q=85',
  },
  {
    id: 3,
    slug: 'solar-inverter-installation',
    title: 'Solar Inverter Installation',
    location: 'Ibadan, Oyo State',
    description:
      'A neatly installed solar inverter and battery system built to provide reliable backup power.',
    coverImage:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=85',
  },
];

function FeaturedProjects() {
  return (
    <section className="bg-[#F5F7FA] section-padding">
      <div className="container">

       
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">

          <div>
            <p className="text-sm font-semibold text-[#D99A08] uppercase tracking-wider mb-3">
              Our Portfolio
            </p>

            <h2 className="section-title">
              Projects We've Delivered
            </h2>

            <p className="section-description mt-4">
              Take a look at some of our completed solar installations
              and the work we are proud to showcase.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B46] hover:text-[#D99A08] transition-colors shrink-0"
          >
            View All Projects
            <ArrowRight size={18} />
          </Link>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 p-3 lg:grid-cols-3 gap-7">
          {sampleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeaturedProjects;
