
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ImagePlus } from 'lucide-react';
import {
  getProjectById,
  updateProject,
  uploadProjectImage,
} from '../../firebase/services/projectServices';

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: 'Residential',
    description: '',
    videoUrl: '',
  });

  const [currentImage, setCurrentImage] = useState('');
  const [currentImagePublicId, setCurrentImagePublicId] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError('');

        const project = await getProjectById(id);

        if (!project) {
          setError('Project not found.');
          return;
        }

        setFormData({
          title: project.title || '',
          location: project.location || '',
          category: project.category || 'Residential',
          description: project.description || '',
          videoUrl: project.videoUrl || '',
        });

        setCurrentImage(
          project.coverImage || project.image || ''
        );

        setCurrentImagePublicId(
          project.coverImagePublicId || ''
        );
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setError('Unable to load project. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image.');
      return;
    }

    setError('');
    setSelectedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError('');

      let imageData = {
        image: currentImage,
        coverImage: currentImage,
        coverImagePublicId: currentImagePublicId,
      };

      if (selectedImage) {
        const uploadedImage = await uploadProjectImage(selectedImage);

        imageData = {
          image: uploadedImage.url,
          coverImage: uploadedImage.url,
          coverImagePublicId: uploadedImage.publicId,
        };
      }

      await updateProject(id, {
        ...formData,
        ...imageData,
      });

      navigate('/admin/projects');
    } catch (err) {
      console.error('Failed to update project:', err);
      setError(err.message || 'Unable to update project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
        <p className="text-slate-500">Loading project...</p>
      </div>
    );
  }

  if (error === 'Project not found.') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
        <h2 className="text-xl font-bold text-[#102B46]">
          Project Not Found
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
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}

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
            Cover Image
          </label>

          {currentImage && (
            <img
              src={currentImage}
              alt="Current project"
              className="w-full max-h-72 object-cover rounded-xl mb-4"
            />
          )}

          <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-[#102B46] transition-colors">
            <ImagePlus size={20} className="text-slate-500" />

            <span className="text-sm text-slate-600">
              {selectedImage
                ? selectedImage.name
                : 'Choose a replacement image'}
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
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
            disabled={saving}
            className="secondary-button"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="primary-button disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? 'Updating Project...' : 'Update Project'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProject;
