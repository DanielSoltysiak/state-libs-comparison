import { Link } from "react-router-dom"
import { useUsersContext } from "./UsersConext"

export const UsersList = () => {
  const { users } = useUsersContext()

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  )
}
