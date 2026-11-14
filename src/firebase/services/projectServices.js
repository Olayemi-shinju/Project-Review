import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';

import { db } from '../config';

const projectsCollection = collection(db, 'projects');

export const getProjects = async () => {
  const projectsQuery = query(
    projectsCollection,
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(projectsQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};


export const getPublishedProjectBySlug = async (slug) => {
  const projectQuery = query(
    projectsCollection,
    where('slug', '==', slug),
    where('status', '==', 'Published')
  );

  const snapshot = await getDocs(projectQuery);

  if (snapshot.empty) {
    return null;
  }

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
};


export const getPublishedProjects = async () => {
  const publishedQuery = query(
    projectsCollection,
    where('status', '==', 'Published')
  );

  const snapshot = await getDocs(publishedQuery);

  return snapshot.docs
    .map((document) => ({
      id: document.id,
      ...document.data(),
    }))
    .sort((a, b) => {
      const dateA = a.createdAt?.toMillis?.() || 0;
      const dateB = b.createdAt?.toMillis?.() || 0;
      return dateB - dateA;
    });
};


export const getProjectById = async (id) => {
  const projectRef = doc(db, 'projects', id);
  const snapshot = await getDoc(projectRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const getProjectBySlug = async (slug) => {
  const projectQuery = query(
    projectsCollection,
    where('slug', '==', slug)
  );

  const snapshot = await getDocs(projectQuery);

  if (snapshot.empty) return null;

  const document = snapshot.docs[0];

  return {
    id: document.id,
    ...document.data(),
  };
};

export const addProject = async (projectData) => {
  const document = await addDoc(projectsCollection, {
    ...projectData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return document.id;
};

export const updateProject = async (id, projectData) => {
  const projectRef = doc(db, 'projects', id);

  await updateDoc(projectRef, {
    ...projectData,
    updatedAt: new Date(),
  });
};

export const deleteProject = async (id) => {
  const projectRef = doc(db, 'projects', id);
  await deleteDoc(projectRef);
};

export const uploadProjectImage = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary configuration is missing.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || 'Image upload failed.');
  }

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};
