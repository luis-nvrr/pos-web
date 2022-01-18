import { nanoid } from 'nanoid'
import create from 'zustand'

export type Notification = {
  id: string
  type: 'info' | 'warning' | 'success' | 'error'
  title: string
  message?: string
}

type NotificationsStore = {
  notifications: Notification[]
  // eslint-disable-next-line no-unused-vars
  addNotification: (notification: Omit<Notification, 'id'>) => void
  // eslint-disable-next-line no-unused-vars
  dismissNotification: (id: string) => void
}

export const useNotificationStore = create<NotificationsStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: nanoid(), ...notification },
      ],
    })),
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id,
      ),
    })),
}))
