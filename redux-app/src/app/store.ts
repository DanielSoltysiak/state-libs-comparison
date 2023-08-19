import { configureStore } from "@reduxjs/toolkit"

import postsReducer from "../features/posts/postsSlice"
import usersReducer from "../features/users/usersSlice"
import notificationsReducer from "../features/notifications/notificationsSlice"
import { useDispatch } from "react-redux"

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
