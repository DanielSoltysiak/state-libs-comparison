import { parseISO, formatDistanceToNow } from "date-fns"
import { memo } from "react"

interface Props {
  timestamp: string
}

export const TimeAgo = memo(({ timestamp }: Props) => {
  let timeAgo = ""
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
})
