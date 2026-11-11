export const ADMIN_UID = import.meta.env.VITE_ADMIN_UUID

export const isAdmin = (user) => {
  return user?.uid === ADMIN_UID;
};
