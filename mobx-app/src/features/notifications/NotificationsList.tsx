import { formatDistanceToNow, parseISO } from "date-fns"
import { useLayoutEffect } from "react"
import { notificationsStore } from "./notificationsStore"
import { usersStore } from "../users/usersStore"
import classnames from "classnames"
import { observer } from "mobx-react-lite"

const NotificationsList = () => {
  const notifications = notificationsStore.notifications
  const users = usersStore.users

  useLayoutEffect(() => notificationsStore.allNotificationsRead())

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

export default observer(NotificationsList)
