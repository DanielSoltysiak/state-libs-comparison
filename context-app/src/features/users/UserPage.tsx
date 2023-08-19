import { Link, useParams } from "react-router-dom"

import { useUsersContext } from "./UsersConext"
import { User } from "../../types"
import { usePostsContext } from "../posts/PostsContext"

export const UserPage = () => {
  const { userId } = useParams()

  const { getUserById } = useUsersContext()
  const { selectPostByUser } = usePostsContext()
  const user = getUserById(userId as string) as User
  const postsForUser = selectPostByUser(userId as string)

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
