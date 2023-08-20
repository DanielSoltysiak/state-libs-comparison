import { useEffect, memo } from "react"
import { Link } from "react-router-dom"

import { Spinner } from "../../components/Spinner"
import { PostAuthor } from "./PostAuthor"
import { TimeAgo } from "./TimeAgo"
import { ReactionButtons } from "./ReactionButtons"
import { postsStore } from "./postsStore"
import { Post } from "../../types"
import { observer } from "mobx-react-lite"

interface IPostExcerpt {
  post?: Post
}

const PostExcerpt = observer(({ post }: IPostExcerpt) => {
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
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
})

export const PostsList = observer(() => {
  const postStatus = postsStore.postsStatus
  const error = postsStore.postsError

  useEffect(() => {
    if (postStatus === "idle") {
      postsStore.fetchPosts()
    }
  }, [postStatus])

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
    <section className="posts-list">
      <h2>Posts</h2>
      {postsStore.posts.map((post) => (
        <PostExcerpt key={post.id} post={post} />
      ))}
    </section>
  )
})
