export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export interface InitialPost {
  title: string
  content: string
  user: string
}

export interface Post extends InitialPost {
  id: string
  date: string
  reactions: {
    thumbsUp: number
    hooray: number
    heart: number
    rocket: number
    eyes: number
  }
}

export type ReactionType = "thumbsUp" | "hooray" | "heart" | "rocket" | "eyes"

export interface User {
  id: string
  name: string
}

export interface Notification {
  id: string
  date: string
  isNew: boolean
  read: boolean
  user: string
  message: string
}
