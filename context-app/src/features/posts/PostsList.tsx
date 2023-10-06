import { useEffect, memo } from "react"
import { Link } from "react-router-dom"

import { Spinner } from "../../components/Spinner"
import { PostAuthor } from "./PostAuthor"
import { TimeAgo } from "./TimeAgo"
import { ReactionButtons } from "./ReactionButtons"
import { usePostsApi, usePostsContext } from "./PostsContext"
import { Post } from "../../types"

interface IPostExcerpt {
  post?: Post
}

const PostExcerpt = memo(({ post }: IPostExcerpt) => {
  if (!post) return null

  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link
        data-test="view-post"
        to={`/posts/${post.id}`}
        className="button muted-button"
      >
        View Post
      </Link>
    </article>
  )
})

export const PostsList = () => {
  const {
    postsStatus: postStatus,
    postsError: error,
    posts,
  } = usePostsContext()

  const { fetchPosts } = usePostsApi()

  useEffect(() => {
    if (postStatus === "idle") fetchPosts()
  }, [postStatus])

  // let content
  // if (postStatus === "loading") {
  //   content = <Spinner text="Loading..." />
  // } else if (postStatus === "succeeded") {
  //   content = posts.map((post) => <PostExcerpt key={post.id} post={post} />)
  // } else if (postStatus === "failed") {
  //   content = <div>{typeof error === "string" ? error : "Unknown error"}</div>
  // }

  if (postStatus === "loading") {
    return (
      <section className="posts-list">
        <h2>Posts</h2>
        <Spinner text="Loading..." />
      </section>
    )
  }

  if (postStatus === "failed") {
    return <div>{typeof error === "string" ? error : "Unknown error"}</div>
  }

  return (
    <section data-test="posts-list" className="posts-list">
      <h2>Posts</h2>
      {posts.map((post) => (
        <PostExcerpt key={post.id} post={post} />
      ))}
    </section>
  )
}
