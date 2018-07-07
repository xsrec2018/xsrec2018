export const ACTION_CARD_ADD = 'card/add';
export const CARD_ADD_IN_PROGRESS = 'CARD_ADD_IN_PROGRESS';
export const CARD_ADD_SUCCESS = 'CARD_ADD_SUCCESS';
export const CARD_ADD_FAILURE = 'CARD_ADD_FAILURE';

export const ACTION_CARD_EDIT = 'card/edit';
export const CARD_EDIT_IN_PROGRESS = 'CARD_EDIT_IN_PROGRESS';
export const CARD_EDIT_SUCCESS = 'CARD_EDIT_SUCCESS';
export const CARD_EDIT_FAILURE = 'CARD_EDIT_FAILURE';

export const ACTION_CARD_REMOVE = 'card/remove';
export const CARD_REMOVE_IN_PROGRESS = 'CARD_REMOVE_IN_PROGRESS';
export const CARD_REMOVE_SUCCESS = 'CARD_REMOVE_SUCCESS';
export const CARD_REMOVE_FAILURE = 'CARD_REMOVE_FAILURE';

export const ACTION_CARD_MERGE = 'card/merge';
export const CARD_MERGE_IN_PROGRESS = 'CARD_MERGE_IN_PROGRESS';
export const CARD_MERGE_SUCCESS = 'CARD_MERGE_SUCCESS';
export const CARD_MERGE_FAILURE = 'CARD_MERGE_FAILURE';


export const cardAdd = (socket, columnId, text) => (dispatch) => {
  socket.emit(ACTION_CARD_ADD, { columnId, text });
  dispatch({ type: CARD_ADD_IN_PROGRESS });
};

export const cardRemove = (socket, cardId) => (dispatch) => {
  socket.emit(ACTION_CARD_REMOVE, { id: cardId });
  dispatch({ type: CARD_REMOVE_IN_PROGRESS });
};

export const cardEdit = (socket, card) => (dispatch) => {
  socket.emit(ACTION_CARD_EDIT, card);
  dispatch({ type: CARD_EDIT_IN_PROGRESS });
};

export const cardMerge = (socket, sourceCardId, targetCardId) => (dispatch) => {
  socket.emit(ACTION_CARD_MERGE, { sourceCardId, targetCardId });
  dispatch({ type: CARD_MERGE_IN_PROGRESS });
};
