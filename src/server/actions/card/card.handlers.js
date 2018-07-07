import mongoose from 'mongoose';
import uniq from 'lodash/uniq';
import Retro from '../../models/retro.model';
import User from '../../models/user.model';
import {
  ACTION_CARD_ADD,
  ACTION_CARD_EDIT,
  ACTION_CARD_REMOVE,
  ACTION_CARD_MERGE
} from './card.actions';
import { getId, getIds } from '../../utils';

export default {
  [ACTION_CARD_ADD]: async (params, state) => {
    const { retroId, userId } = state;
    const { text, columnId } = params;
    const retro = await Retro.findById(retroId);
    if (!retro || !retro.participates(userId)) {
      throw new Error('You are not participating in a retrospective.');
    }
    const column = retro.columns.find(c => getId(c) === columnId);
    if (!column) throw new Error('Column incorrect or not selected.');
    const user = await User.findById(userId);
    const card = {
      _id: new mongoose.Types.ObjectId(),
      columnId,
      text,
      new: true,
      authors: [userId],
      votes: []
    };

    const updated = await Retro.findOneAndUpdate(
      { _id: retroId },
      {
        $push: {
          cards: {
            $each: [card], $position: 0
          }
        }
      },
      { new: true }
    ).exec();
    if (!updated) {
      throw new Error('Couldn\'t add a card.');
    }

    return {
      broadcast: {
        ...card,
        ...{ authors: [user] },
        _id: undefined,
        id: getId(card._id)
      }
    };
  },
  [ACTION_CARD_EDIT]: async (params, state) => {
    const { retroId, userId } = state;
    const { text, id, addVote, removeVote, columnId } = params;
    const retro = await Retro.findById(retroId).populate('cards.authors');
    if (!retro.participates(userId)) {
      throw new Error('You are not participating in a retrospective.');
    }
    const cardIndex = retro.cards.findIndex(c => c.id === id);
    const card = retro.cards[cardIndex];

    if (addVote) card.votes.push(addVote);
    if (removeVote) {
      const key = card.votes.findIndex(v => v.toHexString() === removeVote);
      card.votes.splice(key, 1);
    }
    if (text) card.text = text;
    if (columnId) card.columnId = columnId;

    const updatedRetro = await retro.save();

    if (!updatedRetro) {
      throw new Error('Card not updated because it doesn\'t exist or you don\'t have sufficient privileges.');
    }
    return {
      broadcast: {
        id,
        text: card.text,
        authors: card.authors,
        votes: getIds(card.votes),
        columnId: card.columnId
      }
    };
  },
  [ACTION_CARD_REMOVE]: async (params, state) => {
    const { retroId, userId } = state;
    const { id } = params;
    const retro = await Retro.findById(retroId);
    if (!retro.participates(userId)) {
      throw new Error('You are not participating in a retrospective.');
    }

    const updated = await Retro.findOneAndUpdate({
      _id: retroId,
      cards: { $elemMatch: { _id: id, authors: userId } }
    }, {
      $pull: { cards: { _id: id } }
    }, {
      new: true
    }).exec();

    if (!updated) {
      throw new Error('Card not removed because it doesn\'t exist or you don\'t have sufficient privileges.');
    }

    return {
      broadcast: {
        id
      }
    };
  },
  [ACTION_CARD_MERGE]: async (params, state) => {
    const { retroId, userId } = state;
    const { sourceCardId, targetCardId } = params;
    const retro = await Retro.findById(retroId).populate('cards.authors');
    if (!retro.participates(userId)) {
      throw new Error('You are not participating in a retrospective.');
    }

    // it could be done in one loop
    const sourceCardIndex = retro.cards.findIndex(c => c.id === sourceCardId);
    const targetCardIndex = retro.cards.findIndex(c => c.id === targetCardId);
    const sourceCard = retro.cards[sourceCardIndex];
    const targetCard = retro.cards[targetCardIndex];

    sourceCard.text = `${sourceCard.text}\n${targetCard.text}`;
    sourceCard.authors = uniq([...sourceCard.authors, ...targetCard.authors], author => author.id);

    const updated = await Retro.findOneAndUpdate({
      _id: retroId,
      cards: { $elemMatch: { _id: targetCard.id } }
    }, {
      $pull: { cards: { _id: targetCard.id } }
    }, {
      new: true
    }).exec();

    const updatedRetro = await retro.save();

    if (!updatedRetro || !updated) {
      throw new Error('Card not merge because it doesn\'t exist or you don\'t have sufficient privileges.');
    }
    return {
      broadcast: {
        sourceCard,
        targetCard,
        sourceCardText: sourceCard.text
      }
    };
  }
};
