import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { clientSlice } from 'store/slices/client.slice';

const actions = {
  ...clientSlice.actions
};

export const useAppActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;