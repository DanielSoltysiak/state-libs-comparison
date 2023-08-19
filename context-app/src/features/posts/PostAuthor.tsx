import { memo } from "react"
import { useUsersContext } from "../users/UsersConext"

interface Props {
  userId: string
}

export const PostAuthor = memo(({ userId }: Props) => {
  const { getUserById } = useUsersContext()
  const author = getUserById(userId)

  return <span>by {author ? author.name : "Unknown author"}</span>
})
