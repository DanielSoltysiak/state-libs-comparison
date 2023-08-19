import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit"
import { client } from "../../api/client"

import {
  Post,
  ReactionType,
  RootState,
  InitialPost,
  RequestStatus,
} from "../../types"

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b: Post) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState({
  status: "idle" as RequestStatus,
  error: null as null | undefined | string,
})

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("fakeApi/posts")
  return response.data
})

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: InitialPost) => {
    const response = await client.post("fakeApi/posts", initialPost)
    return response.data
  },
)

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // postAdded: {
    //   reducer(state, action: PayloadAction<Post>) {
    //     state.entities.push(action.payload)
    //   },
    //   prepare(title, content, userId) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         date: new Date().toISOString(),
    //         title,
    //         content,
    //         user: userId,
    //         reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    //       },
    //     }
    //   },
    // },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: ReactionType }>,
    ) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (existingPost) existingPost.reactions[reaction]++
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded"
        postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
  },
})

export const { postUpdated, reactionAdded } = postSlice.actions

export default postSlice.reducer

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts)

export const selectPostByUser = createSelector(
  [selectAllPosts, (_state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId),
)
