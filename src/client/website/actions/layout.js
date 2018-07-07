export const LAYOUT_OPEN_CHANGE_NAME_DIALOG = 'LAYOUT_OPEN_CHANGE_NAME_DIALOG';
export const LAYOUT_OPEN_EXPORT_DIALOG = 'LAYOUT_OPEN_EXPORT_DIALOG';
export const LAYOUT_OPEN_MERGE_CARDS_DIALOG = 'LAYOUT_OPEN_MERGE_CARDS_DIALOG';
export const LAYOUT_OPEN_RETRO_TIMER_DIALOG = 'LAYOUT_OPEN_RETRO_TIMER_DIALOG';
export const LAYOUT_ADD_MESSAGE = 'LAYOUT_ADD_MESSAGE';
export const LAYOUT_REMOVE_MESSAGE = 'LAYOUT_REMOVE_MESSAGE';
export const LAYOUT_SET_LOCALE = 'LAYOUT_SET_LOCALE';

export const openChangeNameDialog = open => ({
  type: LAYOUT_OPEN_CHANGE_NAME_DIALOG,
  payload: open
});

export const openExportDialog = open => ({
  type: LAYOUT_OPEN_EXPORT_DIALOG,
  payload: open
});

export const openMergeCardsDialog = (open, sourceCardId, targetCardId) => ({
  type: LAYOUT_OPEN_MERGE_CARDS_DIALOG,
  payload: { open, sourceCardId, targetCardId }
});

export const openRetroTimerDialog = open => ({
  type: LAYOUT_OPEN_RETRO_TIMER_DIALOG,
  payload: { open }
});

export const addMessage = message => ({
  type: LAYOUT_ADD_MESSAGE,
  payload: message
});

export const removeMessage = id => ({
  type: LAYOUT_REMOVE_MESSAGE,
  payload: id
});

export const setLocale = locale => ({
  type: LAYOUT_SET_LOCALE,
  payload: locale
});
