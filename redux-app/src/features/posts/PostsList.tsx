import { useEffect, memo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { Spinner } from "../../components/Spinner"
import { PostAuthor } from "./PostAuthor"
import { TimeAgo } from "./TimeAgo"
import { ReactionButtons } from "./ReactionButtons"
import { fetchPosts, selectPostIds, selectPostById } from "./postsSlice"
import { RootState } from "../../types"
import { EntityId } from "@reduxjs/toolkit"

interface IPostExcerpt {
  postId: EntityId
}

const PostExcerpt = memo(({ postId }: IPostExcerpt) => {
  let post = useSelector((state: RootState) => selectPostById(state, postId))
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
  const dispatch = useDispatch()
  const orderedPostsIds = useSelector(selectPostIds)

  const postStatus = useSelector((state: RootState) => state.posts.status)
  const error = useSelector((state: RootState) => state.posts.error)

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === "loading") {
    content = <Spinner text="Loading..." />
  } else if (postStatus === "succeeded") {
    content = orderedPostsIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  } else if (postStatus === "failed") {
    content = <div>{error}</div>
  }

  return (
    <section data-test="posts-list" className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
