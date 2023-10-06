import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  fetchNotifiactions,
  selectAllNotifications,
} from "../features/notifications/notificationsSlice"

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.filter((n) => !n.read).length

  const fetchNewNotifications = () => dispatch(fetchNotifiactions())

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
        <h1>Redux Essentials Example</h1>

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
            onClick={fetchNewNotifications}
          >
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
