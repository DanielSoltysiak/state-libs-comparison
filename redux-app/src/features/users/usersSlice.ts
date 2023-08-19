import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit"
import { client } from "../../api/client"
import { RootState, User } from "../../types"

const usersAdapter = createEntityAdapter() as EntityAdapter<User>

const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAsyncThunk("users/fechUsers", async () => {
  const response = await client.get("/fakeApi/users")
  return response.data
})

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  },
})

export default usersSlice.reducer

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state: RootState) => state.users)
