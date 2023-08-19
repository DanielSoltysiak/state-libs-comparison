import { ReactNode, createContext, useContext, useState } from "react"
import { client } from "../../api/client"
import { User } from "../../types"

const useUsers = (initial: User[] = []) => {
  const [users, setUsers] = useState(initial)

  return {
    users,
    getUserById: (userId: string) => {
      return users.find((user) => user.id === userId)
    },
    fetchUsers: async () => {
      const response = await client.get("/fakeApi/users")
      setUsers(response.data)
    },
  }
}

const UsersContext = createContext<ReturnType<typeof useUsers> | null>(null)

export const useUsersContext = () => {
  const context = useContext(UsersContext)
  if (context === undefined) {
    throw new Error("useUsersContext must be used within a UserProvider")
  }

  return context!
}

export function UserProvider({ children }: { children: ReactNode }) {
  return (
    <UsersContext.Provider value={useUsers([])}>
      {children}
    </UsersContext.Provider>
  )
}
