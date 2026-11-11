import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const sampleProjects = [
  {
    id: '1',
    title: 'Residential Solar Installation',
    location: 'Akure, Ondo State',
    category: 'Residential',
    description: 'A residential solar installation project.',
    videoUrl: '',
  },
  {
    id: '2',
    title: 'Commercial Solar System',
    location: 'Lagos, Nigeria',
    category: 'Commercial',
    description: 'A commercial solar system installation.',
    videoUrl: '',
  },
  {
    id: '3',
    title: 'Solar Inverter Installation',
    location: 'Ibadan, Oyo State',
    category: 'Residential',
    description: 'A solar inverter installation project.',
    videoUrl: '',
  },
];

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = sampleProjects.find((item) => item.id === id);

  const [formData, setFormData] = useState(() => ({
    title: project?.title || '',
    location: project?.location || '',
    category: project?.category || 'Residential',
    description: project?.description || '',
    videoUrl: project?.videoUrl || '',
  }));

  if (!project) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
        <h2 className="text-xl font-bold text-[#102B46]">
          Project not found
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          The project you're trying to edit does not exist.
        </p>

        <Link to="/admin/projects" className="primary-button mt-6">
          Back to Projects
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    console.log('Updated project:', id, formData);

    alert('The edit form is ready. Firebase integration is still pending.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-7">
      <div>
        <Link
          to="/admin/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#102B46]"
        >
          <ArrowLeft size={17} />
          Back to Projects
        </Link>

        <h1 className="text-2xl font-bold text-[#102B46] mt-5">
          Edit Project
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Update the information for this project.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 space-y-5"
      >
        <div>
          <label className="block text-sm font-semibold mb-2">
            Project Title
          </label>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-[#102B46]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Project Location
            </label>

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-[#102B46]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Project Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-[#102B46] bg-white"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Project Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-[#102B46] resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Project Video URL (Optional)
          </label>

          <input
            type="url"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="https://example.com/project-video"
            className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-[#102B46]"
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="secondary-button"
          >
            Cancel
          </button>

          <button type="submit" className="primary-button">
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProject;
