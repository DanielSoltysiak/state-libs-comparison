import { memo } from "react"
import { Post } from "../../types"

import { usePostsApi } from "./PostsContext"

type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

type ReactionEmojiEntries = Entries<typeof reactionEmoji>

export const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
} as const

interface Props {
  post: Post
}

export const ReactionButtons = memo(({ post }: Props) => {
  const { reactionAdded } = usePostsApi()

  const reactionButtons = (
    Object.entries(reactionEmoji) as ReactionEmojiEntries
  ).map(([name, emoji]) => {
    return (
      <button
        data-test={`${name}-button`}
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() => reactionAdded(post.id, name)}
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
})
