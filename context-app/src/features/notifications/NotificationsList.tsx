import { formatDistanceToNow, parseISO } from "date-fns"
import { useLayoutEffect } from "react"
import { useNotificationsContext } from "./NotificationsContext"
import { useUsersContext } from "../users/UsersConext"
import classnames from "classnames"

export const NotificationsList = () => {
  const { notifications, allNotificationsRead } = useNotificationsContext()
  const { users } = useUsersContext()

  useLayoutEffect(() => allNotificationsRead())

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: "Unknown User",
    }

    const notificationClassname = classnames("notification", {
      new: notification.isNew,
    })

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
