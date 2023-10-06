import { useParams, Link } from "react-router-dom"

import { PostAuthor } from "./PostAuthor"
import { TimeAgo } from "./TimeAgo"
import { ReactionButtons } from "./ReactionButtons"
import { postsStore } from "./postsStore"
import { observer } from "mobx-react-lite"

export const SinglePostPage = observer(() => {
  const { postId } = useParams()

  const post = postsStore.selectPostById(postId as string)

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2 data-test="post-title">{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link
          data-test="edit-post"
          to={`/editPost/${post.id}`}
          className="button"
        >
          Edit Post
        </Link>
      </article>
    </section>
  )
})
