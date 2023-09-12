/* Instruments */
import type { ReduxState } from '@/redux'

export const selectCurrentUser = (state: ReduxState) => state.user.user
