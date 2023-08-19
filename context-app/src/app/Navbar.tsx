import { Link } from "react-router-dom"
import { useNotificationsContext } from "../features/notifications/NotificationsContext"

export const Navbar = () => {
  const { notifications, fetchNotifiactions } = useNotificationsContext()
  const numUnreadNotifications = notifications.filter((n) => !n.read).length

  let unreadNotificationsBadge

  if (numUnreadNotifications > 0)
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    )

  return (
    <nav>
      <section>
        <h1>Rewritten with Context API</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {unreadNotificationsBadge}
            </Link>
          </div>
          <button className="button" onClick={fetchNotifiactions}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
