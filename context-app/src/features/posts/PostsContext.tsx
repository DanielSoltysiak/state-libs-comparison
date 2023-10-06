import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useMemo,
} from "react"
import { InitialPost, Post, ReactionType, RequestStatus } from "../../types"
import { client } from "../../api/client"

const sortPosts = (posts: Post[]) => {
  const sortedPosts = posts.sort((a, b) => b.date.localeCompare(a.date))
  return sortedPosts
}

interface ContextValue {
  posts: Post[]
  postsError: unknown
  postsStatus: RequestStatus
  selectPostById: (postId: string) => Post | undefined
  selectPostIds: () => string[]
  selectPostByUser: (userId: string) => Post[]
}

interface Api {
  fetchPosts: () => Promise<void>
  addNewPost: (initialPost: InitialPost) => Promise<void>
  postUpdated: (postId: string, title: string, content: string) => void
  reactionAdded: (postId: string, reaction: ReactionType) => void
}

const PostsApi = createContext<Api | null>(null)
const PostsContext = createContext<ContextValue | null>(null)

export const PostsContextProvider = ({ children }: PropsWithChildren) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [postsStatus, setPostsStatus] = useState<RequestStatus>("idle")
  const [postsError, setPostsError] = useState<unknown>(null)

  const value = {
    posts,
    postsError,
    postsStatus,
    selectPostById: (postId: string) => {
      return posts.find((post) => post.id === postId)
    },
    selectPostIds: () => {
      return posts.map((post) => post.id)
    },
    selectPostByUser: (userId: string) => {
      return posts.filter((post) => post.user === userId)
    },
  }

  const api = useMemo(
    () => ({
      fetchPosts: async () => {
        setPostsStatus("loading")
        try {
          const response = await client.get("fakeApi/posts")
          if (response.data) {
            const sortedPosts = sortPosts(response.data)
            setPosts(sortedPosts)
            setPostsStatus("succeeded")
          }
        } catch (error) {
          setPostsError(error)
          setPostsStatus("failed")
        }
      },
      addNewPost: async (initialPost: InitialPost) => {
        const response = await client.post("fakeApi/posts", initialPost)
        setPosts((prevState) => sortPosts([...prevState, response.data]))
      },
      postUpdated: (postId: string, title: string, content: string) => {
        setPosts((prevState) =>
          prevState.map((pst) =>
            pst.id !== postId ? pst : { ...pst, title, content },
          ),
        )
      },
      reactionAdded: (postId: string, reaction: ReactionType) => {
        setPosts((prevstate) =>
          prevstate.map((pst) =>
            pst.id !== postId
              ? pst
              : {
                  ...pst,
                  reactions: {
                    ...pst.reactions,
                    [reaction]: pst.reactions[reaction] + 1,
                  },
                },
          ),
        )
      },
    }),
    [],
  )

  return (
    <PostsContext.Provider value={value}>
      <PostsApi.Provider value={api}>{children}</PostsApi.Provider>
    </PostsContext.Provider>
  )
}

export const usePostsContext = () => {
  const context = useContext(PostsContext)

  if (context === null) {
    throw new Error()
  }

  return context
}

export const usePostsApi = () => {
  const api = useContext(PostsApi)

  if (api === null) {
    throw new Error()
  }

  return api
}
