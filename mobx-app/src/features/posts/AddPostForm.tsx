import { useState, ChangeEvent } from "react"
import { useDispatch, useSelector } from "react-redux"

import { addNewPost } from "./postsSlice"
import { AppDispatch, RequestStatus, RootState } from "../../types"
import { usersStore } from "../users/usersStore"

export const AddPostForm = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [userId, setUserId] = useState("")
  const [addReqestStatus, setAddRequestStatus] = useState<RequestStatus>("idle")

  const dispatch = useDispatch<AppDispatch>()

  const users = usersStore.users

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value)
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value)
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value)

  const canSave =
    [title, content, userId].every(Boolean) && addReqestStatus === "idle"

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("loading")
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle("")
        setContent("")
        setUserId("")
      } catch (err) {
        console.error("Failed to save the post: ", err)
      } finally {
        setAddRequestStatus("idle")
      }
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
