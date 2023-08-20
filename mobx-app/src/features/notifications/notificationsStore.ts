import { Notification } from "../../types"
import { client } from "../../api/client"
import { action, makeAutoObservable, observable } from "mobx"

const sortNotificatons = (notifications: Notification[]) => {
  return notifications.sort((a, b) => b.date.localeCompare(a.date))
}

class Notifications {
  notifications: Notification[] = []

  constructor() {
    makeAutoObservable(this, {
      notifications: observable,
      allNotificationsRead: action,
      fetchNotifiactions: action,
    })
  }

  allNotificationsRead() {
    this.notifications.forEach((notification) => (notification.read = true))
  }

  async fetchNotifiactions() {
    const [latestNotifiaction] = this.notifications
    const latestTimestamp = latestNotifiaction ? latestNotifiaction.date : ""
    const respone = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`,
    )
    if (respone.data) {
      const sortedNotifications = sortNotificatons([
        ...this.notifications,
        ...respone.data,
      ])
      const markedNotifications = sortedNotifications.map(
        (notification) => (
          (notification.isNew = !notification.read), { ...notification }
        ),
      )
      this.notifications = markedNotifications
    }
  }
}

export const notificationsStore = new Notifications()
