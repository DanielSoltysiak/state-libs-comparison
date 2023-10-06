import { ChangeEvent, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { postsStore } from "./postsStore"
import { observer } from "mobx-react-lite"

export const EditPostForm = observer(() => {
  const { postId } = useParams()

  const post = postsStore.selectPostById(postId as string)

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)

  const navigate = useNavigate()

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value)
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      postsStore.updatePost(postId as string, title, content)
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          data-test="post-title-input"
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
      <button data-test="save-post" type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
})
