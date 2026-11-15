
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ImagePlus, X } from 'lucide-react';
import {
  getProjectById,
  updateProject,
  uploadProjectImage,
} from '../../firebase/services/projectServices';

const MAX_GALLERY_IMAGES = 8;

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const previewUrls = useRef(new Set());

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

  const [currentGallery, setCurrentGallery] = useState([]);
  const [newGallery, setNewGallery] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const createPreview = (file) => {
    const preview = URL.createObjectURL(file);
    previewUrls.current.add(preview);
    return preview;
  };

  const revokePreview = (preview) => {
    if (preview && previewUrls.current.has(preview)) {
      URL.revokeObjectURL(preview);
      previewUrls.current.delete(preview);
    }
  };

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

        setCurrentImage(project.coverImage || project.image || '');
        setCurrentImagePublicId(project.coverImagePublicId || '');

        const gallery = Array.isArray(project.gallery)
          ? project.gallery.map((item, index) => {
              if (typeof item === 'string') {
                return {
                  url: item,
                  publicId: '',
                  key: `existing-${index}`,
                };
              }

              return {
                url: item.url,
                publicId: item.publicId || '',
                key: `existing-${index}`,
              };
            }).filter((item) => item.url)
          : [];

        setCurrentGallery(gallery);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setError('Unable to load project. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    return () => {
      previewUrls.current.forEach((url) => URL.revokeObjectURL(url));
      previewUrls.current.clear();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid cover image.');
      return;
    }

    if (selectedImage?.preview) {
      revokePreview(selectedImage.preview);
    }

    setError('');

    setSelectedImage({
      file,
      preview: createPreview(file),
    });
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';

    if (!files.length) return;

    const validFiles = files.filter((file) =>
      file.type.startsWith('image/')
    );

    const invalidCount = files.length - validFiles.length;
    const availableSlots =
      MAX_GALLERY_IMAGES - currentGallery.length - newGallery.length;

    const filesToAdd = validFiles.slice(0, Math.max(0, availableSlots));

    if (filesToAdd.length) {
      const previews = filesToAdd.map((file) => ({
        file,
        preview: createPreview(file),
      }));

      setNewGallery((current) => [...current, ...previews]);
    }

    if (invalidCount > 0) {
      setError('Some selected files were not valid images.');
    } else if (validFiles.length > availableSlots) {
      setError(`You can only have ${MAX_GALLERY_IMAGES} gallery images.`);
    } else {
      setError('');
    }
  };

  const removeCurrentGalleryImage = (key) => {
    setCurrentGallery((current) =>
      current.filter((image) => image.key !== key)
    );
  };

  const removeNewGalleryImage = (index) => {
    setNewGallery((current) => {
      const image = current[index];

      if (image) {
        revokePreview(image.preview);
      }

      return current.filter((_, i) => i !== index);
    });
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
        const uploadedImage = await uploadProjectImage(selectedImage.file);

        imageData = {
          image: uploadedImage.url,
          coverImage: uploadedImage.url,
          coverImagePublicId: uploadedImage.publicId,
        };
      }

      const updatedGallery = [...currentGallery];

      for (const image of newGallery) {
        const uploadedImage = await uploadProjectImage(image.file);

        updatedGallery.push({
          url: uploadedImage.url,
          publicId: uploadedImage.publicId,
        });
      }

      await updateProject(id, {
        ...formData,
        ...imageData,
        gallery: updatedGallery.map(({ url, publicId }) => ({
          url,
          publicId,
        })),
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

  const galleryCount = currentGallery.length + newGallery.length;
  const galleryLimitReached = galleryCount >= MAX_GALLERY_IMAGES;

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
          Update the project information and manage its images.
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
        </section>

        <div className="border-t border-slate-100" />

        <section className="space-y-5">
          <h2 className="font-bold text-[#102B46]">
            Cover Image
          </h2>

          {(selectedImage?.preview || currentImage) && (
            <div>
              <img
                src={selectedImage?.preview || currentImage}
                alt="Project cover"
                className="w-full max-h-72 object-cover rounded-xl"
              />

              {selectedImage && (
                <p className="text-xs text-slate-500 mt-2">
                  Replacement image selected: {selectedImage.file.name}
                </p>
              )}
            </div>
          )}

          <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-[#102B46] transition-colors">
            <ImagePlus size={20} className="text-slate-500" />

            <span className="text-sm text-slate-600">
              Choose a replacement cover image
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </section>

        <div className="border-t border-slate-100" />

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-bold text-[#102B46]">
              Project Gallery
            </h2>

            <span className="text-xs text-slate-500">
              {galleryCount}/{MAX_GALLERY_IMAGES} images
            </span>
          </div>

          {galleryCount > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {currentGallery.map((image) => (
                <div key={image.key} className="relative group">
                  <img
                    src={image.url}
                    alt="Project gallery"
                    className="w-full h-32 sm:h-40 object-cover rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => removeCurrentGalleryImage(image.key)}
                    disabled={saving}
                    aria-label="Remove gallery image"
                    className="absolute top-2 right-2 bg-white text-red-600 rounded-full p-1.5 shadow hover:bg-red-50"
                  >
                    <X size={16} />
                  </button>

                  <span className="block text-xs text-slate-500 mt-1">
                    Existing image
                  </span>
                </div>
              ))}

              {newGallery.map((image, index) => (
                <div key={image.preview} className="relative group">
                  <img
                    src={image.preview}
                    alt={image.file.name}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => removeNewGalleryImage(index)}
                    disabled={saving}
                    aria-label={`Remove ${image.file.name}`}
                    className="absolute top-2 right-2 bg-white text-red-600 rounded-full p-1.5 shadow hover:bg-red-50"
                  >
                    <X size={16} />
                  </button>

                  <span className="block text-xs text-slate-500 mt-1 truncate">
                    {image.file.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {!galleryCount && (
            <p className="text-sm text-slate-500">
              No gallery images added yet.
            </p>
          )}

          {!galleryLimitReached && (
            <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-[#102B46] transition-colors">
              <ImagePlus size={20} className="text-slate-500" />

              <span className="text-sm text-slate-600">
                Add gallery images
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

          <p className="text-xs text-slate-400">
            You can add up to {MAX_GALLERY_IMAGES} gallery images. Removing
            an image here removes it from the project record when you save.
          </p>
        </section>

        <div className="border-t border-slate-100" />

        <section>
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
        </section>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}

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
