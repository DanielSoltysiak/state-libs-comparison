import { Link } from "react-router-dom"
import { notificationsStore } from "../features/notifications/notificationsStore"
import { observer } from "mobx-react-lite"

const Navbar = () => {
  const notifications = notificationsStore.notifications
  const numUnreadNotifications = notifications.filter((n) => !n.read).length

  const fetchNewNotifications = () => notificationsStore.fetchNotifiactions()

  let unreadNotificationsBadge

  if (numUnreadNotifications > 0)
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    )

  return (
    <nav>
      <section>
        <h1>Rewritten with MobX</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {unreadNotificationsBadge}
            </Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}

export default observer(Navbar)
