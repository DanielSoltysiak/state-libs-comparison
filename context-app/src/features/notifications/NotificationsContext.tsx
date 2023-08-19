import { ReactNode, createContext, useContext, useState } from "react"
import { Notification } from "../../types"
import { client } from "../../api/client"

const sortNotificatons = (notifications: Notification[]) => {
  return notifications.sort((a, b) => b.date.localeCompare(a.date))
}

const useNotifications = (initial: Notification[] = []) => {
  const [notifications, setNotifications] = useState(initial)

  return {
    notifications,
    allNotificationsRead: () => {
      const readNotifications = notifications.map(
        (notification) => ((notification.read = true), { ...notification }),
      )
      setNotifications(readNotifications)
    },
    fetchNotifiactions: async () => {
      const [latestNotifiaction] = notifications
      const latestTimestamp = latestNotifiaction ? latestNotifiaction.date : ""
      const respone = await client.get(
        `/fakeApi/notifications?since=${latestTimestamp}`,
      )
      if (respone.data) {
        const sortedNotifications = sortNotificatons(respone.data)
        const markedNotifications = sortedNotifications.map(
          (notification) => (
            (notification.isNew = !notification.read), { ...notification }
          ),
        )
        setNotifications(markedNotifications)
      }
    },
  }
}

const NotificationsContext = createContext<ReturnType<
  typeof useNotifications
> | null>(null)

export const useNotificationsContext = () => {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error(
      "useNotificationsContext must be used within a NotificationProvider",
    )
  }

  return context!
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  return (
    <NotificationsContext.Provider value={useNotifications([])}>
      {children}
    </NotificationsContext.Provider>
  )
}
