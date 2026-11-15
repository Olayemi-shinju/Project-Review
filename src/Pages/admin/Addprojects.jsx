
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ImagePlus, X } from 'lucide-react';
import {
  addProject,
  uploadProjectImage,
} from '../../firebase/services/projectServices';

const MAX_GALLERY_IMAGES = 8;

function AddProject() {
  const navigate = useNavigate();
  const previewUrls = useRef(new Set());

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

  useEffect(() => {
    return () => {
      previewUrls.current.forEach((url) => URL.revokeObjectURL(url));
      previewUrls.current.clear();
    };
  }, []);

  const createPreview = (file) => {
    const url = URL.createObjectURL(file);
    previewUrls.current.add(url);
    return url;
  };

  const revokePreview = (url) => {
    if (url) {
      URL.revokeObjectURL(url);
      previewUrls.current.delete(url);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid cover image.');
      e.target.value = '';
      return;
    }

    if (coverImage) {
      revokePreview(coverImage.preview);
    }

    setCoverImage({
      file,
      preview: createPreview(file),
    });

    setError('');
    e.target.value = '';
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) =>
      file.type.startsWith('image/')
    );

    const remainingSlots = MAX_GALLERY_IMAGES - gallery.length;
    const acceptedFiles = validFiles.slice(0, remainingSlots);

    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: createPreview(file),
    }));

    setGallery((current) => [...current, ...newImages]);

    if (validFiles.length !== files.length) {
      setError('Some selected files were not valid images.');
    } else if (validFiles.length > remainingSlots) {
      setError(`You can only add ${MAX_GALLERY_IMAGES} gallery images.`);
    } else {
      setError('');
    }

    e.target.value = '';
  };

  const removeCoverImage = () => {
    if (coverImage) {
      revokePreview(coverImage.preview);
    }

    setCoverImage(null);
  };

  const removeGalleryImage = (index) => {
    setGallery((current) => {
      const imageToRemove = current[index];

      revokePreview(imageToRemove.preview);

      return current.filter((_, i) => i !== index);
    });
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

    if (!formData.title.trim() || !formData.location.trim()) {
      setError('Please complete the project title and location.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const uploadedCover = await uploadProjectImage(coverImage.file);

      const uploadedGallery = [];

      for (const image of gallery) {
        const uploadedImage = await uploadProjectImage(image.file);

        uploadedGallery.push({
          url: uploadedImage.url,
          publicId: uploadedImage.publicId,
        });
      }

      await addProject({
        ...formData,
        title: formData.title.trim(),
        location: formData.location.trim(),
        slug: createSlug(formData.title),
        status: 'Published',
        image: uploadedCover.url,
        coverImage: uploadedCover.url,
        coverImagePublicId: uploadedCover.publicId,
        gallery: uploadedGallery,
      });

      navigate('/admin/projects');
    } catch (err) {
      console.error('Failed to add project:', err);

      setError(
        err.message || 'Unable to save project. Please try again.'
      );
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
          <div>
            <h2 className="font-bold text-[#102B46]">
              Project Media
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Upload one cover image and up to eight additional gallery images.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3">
              Cover Image <span className="text-red-500">*</span>
            </label>

            {coverImage ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200">
                <img
                  src={coverImage.preview}
                  alt="Cover preview"
                  className="w-full h-64 object-cover"
                />

                <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white px-4 py-3 flex items-center justify-between gap-3">
                  <p className="text-sm truncate">
                    {coverImage.file.name}
                  </p>

                  <button
                    type="button"
                    onClick={removeCoverImage}
                    className="flex items-center gap-1 text-sm text-red-300 hover:text-white"
                  >
                    <X size={17} />
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-200 rounded-xl p-7 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#102B46] transition-colors">
                <ImagePlus size={30} className="text-slate-400 mb-3" />

                <span className="text-sm font-semibold text-[#102B46]">
                  Choose a cover image
                </span>

                <span className="text-xs text-slate-400 mt-2">
                  This image will represent the project.
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <label className="block text-sm font-semibold">
                Project Gallery
              </label>

              <span className="text-xs font-semibold text-slate-500">
                {gallery.length}/{MAX_GALLERY_IMAGES} images
              </span>
            </div>

            {gallery.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
                {gallery.map((image, index) => (
                  <div
                    key={image.preview}
                    className="relative group rounded-lg overflow-hidden border border-slate-200"
                  >
                    <img
                      src={image.preview}
                      alt={`Gallery preview ${index + 1}`}
                      className="w-full h-36 object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white p-2">
                      <p className="text-xs truncate">
                        {image.file.name}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      aria-label={`Remove gallery image ${index + 1}`}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white text-red-500 flex items-center justify-center shadow hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <X size={17} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {gallery.length < MAX_GALLERY_IMAGES && (
              <label className="border-2 border-dashed border-slate-200 rounded-xl p-7 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#102B46] transition-colors">
                <ImagePlus size={30} className="text-slate-400 mb-3" />

                <span className="text-sm font-semibold text-[#102B46]">
                  Add Gallery Images
                </span>

                <span className="text-xs text-slate-400 mt-2">
                  Select multiple images. {MAX_GALLERY_IMAGES - gallery.length} slots remaining.
                </span>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                  className="hidden"
                />
              </label>
            )}

            {gallery.length === MAX_GALLERY_IMAGES && (
              <p className="text-sm text-green-700">
                You've reached the maximum of eight gallery images.
              </p>
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
            {saving ? 'Uploading Images & Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;
