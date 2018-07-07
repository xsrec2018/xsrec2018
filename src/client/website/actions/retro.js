import { push } from 'react-router-redux';
import qs from 'query-string';

export const ACTION_RETRO = 'retro/success';
export const RETRO_RECEIVED = 'RETRO_RECEIVED';

export const ACTION_RETRO_NEW = 'retro/new';
export const RETRO_NEW_IN_PROGRESS = 'RETRO_NEW_IN_PROGRESS';
export const RETRO_NEW_SUCCESS = 'RETRO_NEW_SUCCESS';
export const RETRO_NEW_FAILURE = 'RETRO_NEW_FAILURE';

export const ACTION_RETRO_JOIN = 'retro/join';
export const RETRO_JOIN_IN_PROGRESS = 'RETRO_JOIN_IN_PROGRESS';
export const RETRO_JOIN_SUCCESS = 'RETRO_JOIN_SUCCESS';
export const RETRO_JOIN_FAILURE = 'RETRO_JOIN_FAILURE';

export const ACTION_RETRO_SET_TIMER = 'retro/setTimer';
export const RETRO_SET_TIMER_IN_PROGRESS = 'RETRO_SET_TIMER_IN_PROGRESS';
export const RETRO_SET_TIMER_SUCCESS = 'RETRO_SET_TIMER_SUCCESS';
export const RETRO_SET_TIMER_FAILURE = 'RETRO_SET_TIMER_FAILURE';

export const ACTION_RETRO_UPDATE_TIMER = 'retro/updateTimer';
export const RETRO_UPDATE_TIMER_IN_PROGRESS = 'RETRO_UPDATE_TIMER_IN_PROGRESS';
export const RETRO_UPDATE_TIMER_SUCCESS = 'RETRO_UPDATE_TIMER_SUCCESS';
export const RETRO_UPDATE_TIMER_FAILURE = 'RETRO_UPDATE_TIMER_FAILURE';

export const ACTION_RETRO_LEAVE = 'retro/leave/success';
export const RETRO_LEAVE = 'RETRO_LEAVE';

export const ACTION_RETRO_EDIT = 'retro/edit';
export const RETRO_EDIT_IN_PROGRESS = 'RETRO_EDIT_IN_PROGRESS';
export const RETRO_EDIT_SUCCESS = 'RETRO_EDIT_SUCCESS';
export const RETRO_EDIT_FAILURE = 'RETRO_EDIT_FAILURE';

export const CARD_FILTER_BY_PHRASE_CHANGE = 'CARD_FILTER_BY_PHRASE';

export const setRetroIdQueryParameter = retroId => (dispatch) => {
  const query = { r: retroId };
  const searchString = qs.stringify(query);

  dispatch(push({
    search: searchString
  }));
};

export const retroCreate = (socket, name) => (dispatch) => {
  socket.emit(ACTION_RETRO_NEW, { name });
  dispatch({ type: RETRO_NEW_IN_PROGRESS });
};

export const retroJoin = (socket, shareId) => (dispatch) => {
  socket.emit(ACTION_RETRO_JOIN, { id: shareId });
  dispatch({ type: RETRO_JOIN_IN_PROGRESS });
};
export const retroLeave = (socket, shareId) => (dispatch) => {
  socket.emit(RETRO_LEAVE, { id: shareId });
  dispatch({ type: RETRO_LEAVE });
};

export const retroEdit = (socket, edits) => (dispatch) => {
  socket.emit(ACTION_RETRO_EDIT, edits);
  dispatch({ type: RETRO_EDIT_IN_PROGRESS });
};

export const changeCardFilterPhrase = phrase => (dispatch) => {
  dispatch({ type: CARD_FILTER_BY_PHRASE_CHANGE, payload: { phrase } });
};

export const retroSetTimer = (socket, writeTime, voteTime, reviewTime, allTime) => (dispatch) => {
  const payload = { writeTime, voteTime, reviewTime, allTime };
  socket.emit(ACTION_RETRO_SET_TIMER, payload);
  dispatch({ type: RETRO_SET_TIMER_IN_PROGRESS, payload });
};

export const retroUpdateTimer = (socket, retroStep, reset = false) => (dispatch) => {
  const payload = { retroStep, reset };
  socket.emit(ACTION_RETRO_UPDATE_TIMER, payload);
  dispatch({ type: RETRO_UPDATE_TIMER_IN_PROGRESS, payload });
};
