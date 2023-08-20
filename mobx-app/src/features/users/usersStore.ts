import { client } from "../../api/client"
import { User } from "../../types"
import { makeAutoObservable } from "mobx"

class Users {
  users: User[] = []

  constructor() {
    makeAutoObservable(this)
  }

  selectUserById(userId: string) {
    return this.users.find((user) => user.id === userId)
  }

  async fetchUsers() {
    const response = await client.get("/fakeApi/users")
    this.users = response.data
  }
}

export const usersStore = new Users()
