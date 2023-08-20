import { configureStore } from "@reduxjs/toolkit"

import postsReducer from "../features/posts/postsSlice"
import { useDispatch } from "react-redux"

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
