
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

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from '../config';


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

export const getProjectById = async (id) => {
  const projectRef = doc(db, 'projects', id);
  const snapshot = await getDoc(projectRef);

  if (!snapshot.exists()) {
    return null;
  }

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

  if (snapshot.empty) {
    return null;
  }

  const document = snapshot.docs[0];

  return {
    id: document.id,
    ...document.data(),
  };
};

export const addProject = async (projectData) => {
  const project = {
    ...projectData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const document = await addDoc(projectsCollection, project);

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

export const uploadProjectImage = async (file, path) => {
  const imageRef = ref(storage, path);

  await uploadBytes(imageRef, file);

  const url = await getDownloadURL(imageRef);

  return {
    url,
    path,
  };
};

export const deleteUploadedImage = async (path) => {
  const imageRef = ref(storage, path);

  await deleteObject(imageRef);
};
