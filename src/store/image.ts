import { create } from "zustand";

type ImageStore = {
  imageFile: File | null;
  setImageFile: (image: File) => void;
  clearImageFile: () => void;
};

export const useImageStore = create<ImageStore>((set) => ({
  imageFile: null,
  setImageFile: (image) => set(() => ({ imageFile: image })),
  clearImageFile: () => set(() => ({ imageFile: null })),
}));
