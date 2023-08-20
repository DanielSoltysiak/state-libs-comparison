import { Post, ReactionType } from "../../types"
import { useDispatch } from "react-redux"

import { reactionAdded } from "./postsSlice"

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
}

interface Props {
  post: Post
}

export const ReactionButtons = ({ post }: Props) => {
  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(
            reactionAdded({ postId: post.id, reaction: name as ReactionType }),
          )
        }
      >
        {emoji} {post.reactions[name as ReactionType]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
