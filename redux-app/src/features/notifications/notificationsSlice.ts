import {
  EntityAdapter,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit"
import { RootState, Notification } from "../../types"
import { client } from "../../api/client"

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
}) as EntityAdapter<Notification>

export const fetchNotifiactions = createAsyncThunk<Notification>(
  "notifications/fetchNotificatons",
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState() as RootState)
    const [latestNotifiaction] = allNotifications
    const latestTimestamp = latestNotifiaction ? latestNotifiaction.date : ""
    const respone = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`,
    )
    return respone.data
  },
)

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state) {
      Object.values(state.entities).forEach(
        (notification) => (notification.read = true),
      )
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifiactions.fulfilled, (state, action) => {
      notificationsAdapter.upsertMany(state, action.payload)
      Object.values(state.entities).forEach((notification) => {
        notification.isNew = !notification.read
      })
    })
  },
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer

export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors((state: RootState) => state.notifications)
