import { ChangeEvent, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { usePostsApi, usePostsContext } from "./PostsContext"

export const EditPostForm = () => {
  const { postId } = useParams()
  const { postUpdated } = usePostsApi()
  const { selectPostById } = usePostsContext()

  const post = selectPostById(postId as string)

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)

  const navigate = useNavigate()

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value)
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      postUpdated(postId as string, title, content)
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}