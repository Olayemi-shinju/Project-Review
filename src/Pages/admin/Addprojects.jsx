
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ImagePlus, X } from 'lucide-react';
import {
  addProject,
  uploadProjectImage,
  deleteUploadedImage,
} from '../../firebase/services/projectServices';

function AddProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: 'Residential',
    description: '',
    videoUrl: '',
  });

  const [coverImage, setCoverImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image.');
        return;
      }

      setError('');
      setCoverImage(file);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) =>
      file.type.startsWith('image/')
    );

    if (validFiles.length !== files.length) {
      setError('Some files were not valid images.');
    } else {
      setError('');
    }

    setGallery((current) => [...current, ...validFiles]);
    e.target.value = '';
  };

  const removeGalleryImage = (index) => {
    setGallery((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  const createSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage) {
      setError('Please select a cover image.');
      return;
    }

    setSaving(true);
    setError('');

    const uploadedImages = [];

    try {
      const folder = `projects/${Date.now()}`;

      const uploadedCover = await uploadProjectImage(
        coverImage,
        `${folder}/cover-${coverImage.name}`
      );

      uploadedImages.push(uploadedCover.path);

      const uploadedGallery = [];

      for (let i = 0; i < gallery.length; i++) {
        const uploadedImage = await uploadProjectImage(
          gallery[i],
          `${folder}/gallery-${i}-${gallery[i].name}`
        );

        uploadedImages.push(uploadedImage.path);
        uploadedGallery.push(uploadedImage);
      }

      await addProject({
        ...formData,
        slug: createSlug(formData.title),
        status: 'Published',
        image: uploadedCover.url,
        coverImage: uploadedCover.url,
        coverImagePath: uploadedCover.path,
        gallery: uploadedGallery,
      });

      navigate('/admin/projects');
    } catch (err) {
      console.error('Failed to add project:', err);

      await Promise.allSettled(
        uploadedImages.map((path) => deleteUploadedImage(path))
      );

      setError('Unable to save project. Please try again.');
    } finally {
      setSaving(false);
    }
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
          Add New Project
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Add details and images of a completed solar installation.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 space-y-7"
      >
        <section className="space-y-5">
          <h2 className="font-bold text-[#102B46]">
            Project Information
          </h2>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Project Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. 10kVA Residential Solar Installation"
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
                placeholder="e.g. Akure, Ondo State"
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
              placeholder="Describe the installation, its capacity, equipment used and the work completed..."
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-[#102B46] resize-y"
            />
          </div>
        </section>

        <div className="border-t border-slate-100" />

        <section className="space-y-5">
          <h2 className="font-bold text-[#102B46]">
            Project Media
          </h2>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Cover Image
            </label>

            <label className="border-2 border-dashed border-slate-200 rounded-xl p-7 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#102B46] transition-colors">
              <ImagePlus size={30} className="text-slate-400 mb-3" />

              <span className="text-sm font-semibold text-[#102B46]">
                {coverImage ? coverImage.name : 'Choose a cover image'}
              </span>

              <span className="text-xs text-slate-400 mt-2">
                Select one image for the project thumbnail.
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                required
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Project Gallery
            </label>

            <label className="border-2 border-dashed border-slate-200 rounded-xl p-7 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#102B46] transition-colors">
              <ImagePlus size={30} className="text-slate-400 mb-3" />

              <span className="text-sm font-semibold text-[#102B46]">
                Select gallery images
              </span>

              <span className="text-xs text-slate-400 mt-2">
                You can select multiple images.
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                className="hidden"
              />
            </label>

            {gallery.length > 0 && (
              <div className="space-y-2 mt-4">
                {gallery.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between gap-3 bg-slate-50 rounded-lg px-4 py-3"
                  >
                    <p className="text-sm text-slate-600 truncate">
                      {file.name}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      aria-label={`Remove ${file.name}`}
                      className="text-red-500 hover:text-red-700 shrink-0"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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

            <p className="text-xs text-slate-400 mt-2">
              You can leave this empty if the project has no video.
            </p>
          </div>
        </section>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}

        <div className="border-t border-slate-100" />

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
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
            className="primary-button disabled:opacity-50"
          >
            {saving ? 'Saving Project...' : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;
