import { Link } from "react-router-dom"
import { useNotificationsContext } from "../features/notifications/NotificationsContext"

export const Navbar = () => {
  const { notifications, fetchNotifiactions } = useNotificationsContext()
  const numUnreadNotifications = notifications.filter((n) => !n.read).length

  let unreadNotificationsBadge

  if (numUnreadNotifications > 0)
    unreadNotificationsBadge = (
      <span className="badge" data-test="badge">
        {numUnreadNotifications}
      </span>
    )

  return (
    <nav>
      <section>
        <h1>Rewritten with Context API</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/" data-test="navigation-posts">
              Posts
            </Link>
            <Link to="/users" data-test="navigation-users">
              Users
            </Link>
            <Link to="/notifications" data-test="navigation-notifications">
              Notifications {unreadNotificationsBadge}
            </Link>
          </div>
          <button
            data-test="refresh-notifications"
            className="button"
            onClick={fetchNotifiactions}
          >
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
