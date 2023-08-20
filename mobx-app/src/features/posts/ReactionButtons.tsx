import { Post, ReactionType } from "../../types"

import { postsStore } from "./postsStore"
import { observer } from "mobx-react-lite"

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

export const ReactionButtons = observer(({ post }: Props) => {
  const reactionButtons = (
    Object.entries(reactionEmoji) as ReactionEmojiEntries
  ).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() => postsStore.addReaction(post.id, name)}
      >
        {emoji} {post.reactions[name as ReactionType]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
})
