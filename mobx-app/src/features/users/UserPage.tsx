import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

import { usersStore } from "./usersStore"
import { selectPostByUser } from "../posts/postsSlice"
import { RootState, User } from "../../types"

export const UserPage = () => {
  const { userId } = useParams()

  const user = usersStore.selectUserById(userId as string) as User

  const postsForUser = useSelector((state: RootState) =>
    selectPostByUser(state, userId),
  )

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>{" "}
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}
