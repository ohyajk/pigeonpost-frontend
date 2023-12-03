import { create } from "zustand"

export const comBoxState = create((set) => ({
    comState: {
        visible: false,
        postId: "",
    },
    hideComBox: () => set((state) => ({ comState: { visible: false, postId: "" } })),
    showComBox: (postId) => set((state) => ({ comState: { visible: true, postId } })),
}))
