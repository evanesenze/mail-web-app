import { IMail } from './../../types/Mails';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MailFilter } from 'types/Mails';
import { IClientSliceState } from 'types/ClientSlice';

const initialState: IClientSliceState = {
  filter: 'incoming',
  selectedMailIds: [],
  query: ''
};

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<MailFilter | undefined>) {
      state.filter = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setGroupId(state, action: PayloadAction<number | undefined>) {
      state.groupId = action.payload;
    },
    setCurrentMail(state, action: PayloadAction<IMail | undefined>) {
      state.currentMail = action.payload;
    },
    setSelectedMails(state, action: PayloadAction<number[]>) {
      state.selectedMailIds = action.payload
    },
    addSelectedMail(state, action: PayloadAction<IMail>) {
      const { id } = action.payload;
      if (state.selectedMailIds.includes(id)) return;
      state.selectedMailIds.push(id);
    },
    removeSelectedMail(state, action: PayloadAction<IMail>) {
      const { id } = action.payload;
      state.selectedMailIds = state.selectedMailIds.filter(item => item !== id);
    }
  }
})