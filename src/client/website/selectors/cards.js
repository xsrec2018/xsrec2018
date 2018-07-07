import { createSelector } from 'reselect';
import deepClone from '../services/utils/deepClone';
import {
  RETRO_CARDS_KEY,
  CARD_FILTER_PHRASE

} from '../reducers/retro';

const getRetroCards = state => deepClone(state.retro[RETRO_CARDS_KEY]);
const getRetroFilterPhrase = state => deepClone(state.retro[CARD_FILTER_PHRASE]);

const phraseFilter = (card, phrase) => phrase.length < 2 || card.text.includes(phrase);

export const getSortedCardsByVotes = createSelector(
  getRetroCards,
  (cards) => {
    cards.sort((a, b) => (a.votes.length < b.votes.length ? 1 : -1));

    return cards;
  }
);

export const getFilteredCards = createSelector(
  getRetroCards,
  getRetroFilterPhrase,
  (cards, phrase) => cards.map(card => ({ ...card, visible: phraseFilter(card, phrase) }))
);

export const getSortedAndFilteredCards = createSelector(
  getSortedCardsByVotes,
  getRetroFilterPhrase,
  (cards, phrase) => cards.map(card => ({ ...card, visible: phraseFilter(card, phrase) }))
);
