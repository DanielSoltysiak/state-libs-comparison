import { Link, useParams } from "react-router-dom"

import { usersStore } from "./usersStore"
import { postsStore } from "../posts/postsStore"
import { User } from "../../types"

export const UserPage = () => {
  const { userId } = useParams()

  const user = usersStore.selectUserById(userId as string) as User

  const postsForUser = postsStore.selectPostByUser(user.id)

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
