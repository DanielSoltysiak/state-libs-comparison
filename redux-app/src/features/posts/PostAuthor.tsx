import { useSelector } from "react-redux"
import { selectUserById } from "../users/usersSlice"
import { RootState } from "../../types"
import { EntityId } from "@reduxjs/toolkit"

interface Props {
  userId: EntityId
}

export const PostAuthor = ({ userId }: Props) => {
  const author = useSelector((state: RootState) =>
    selectUserById(state, userId),
  )

  return <span>by {author ? author.name : "Unknown author"}</span>
}
