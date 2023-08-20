import { client } from "../../api/client"
import {
  Post,
  ReactionType,
  InitialPost,
  RequestStatus,
} from "../../types"
import { makeAutoObservable } from "mobx"

const sortPosts = (posts: Post[]) => {
  const sortedPosts = posts.sort((a, b) => b.date.localeCompare(a.date))
  return sortedPosts
}

class Posts {
  posts: Post[] = []
  postsStatus: RequestStatus = "idle"
  postsError: unknown = null

  constructor() {
    makeAutoObservable(this)
  }

  selectPostById(postId: string) {
    return this.posts.find((post) => post.id === postId)
  }

  selectPostIds() {
    return this.posts.map((post) => post.id)
  }

  selectPostByUser(userId: string) {
    return this.posts.filter((post) => post.user === userId)
  }

  async addNewPost(initialPost: InitialPost) {
    const response = await client.post("fakeApi/posts", initialPost)
    this.posts = sortPosts([...this.posts, response.data])
  }

  updatePost(postId: string, title: string, content: string) {
    this.posts = this.posts.map((post) =>
      post.id === postId ? { ...post, title, content } : post,
    )
  }

  addReaction(postId: string, reaction: ReactionType) {
    this.posts = this.posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            reactions: {
              ...post.reactions,
              [reaction]: post.reactions[reaction] + 1,
            },
          }
        : post,
    )
  }

  async fetchPosts() {
    this.postsStatus = "loading"
    try {
      const response = await client.get("fakeApi/posts")
      if (response.data) {
        const sortedPosts = sortPosts(response.data)
        this.posts = sortedPosts
        this.postsStatus = "succeeded"
      }
    } catch (error) {
      this.postsError = error
      this.postsStatus = "failed"
    }
  }
}

export const postsStore = new Posts()
