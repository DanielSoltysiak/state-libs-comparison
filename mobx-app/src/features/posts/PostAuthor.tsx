import { usersStore } from "../users/usersStore"
import { EntityId } from "@reduxjs/toolkit"

interface Props {
  userId: EntityId
}

export const PostAuthor = ({ userId }: Props) => {
  const author = usersStore.selectUserById(userId as string)

  return <span>by {author ? author.name : "Unknown author"}</span>
}
