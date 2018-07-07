import * as json2csv from 'json2csv';

const fields = ['column', 'text', 'authors'];

const mergeData = (cards, columns) => cards.map(card => ({
  text: card.text,
  authors: card.authors,
  column: columns.filter(c => c.id === card.columnId)[0]
}));

export const csvCardSerializer = (cards, columns) => json2csv.parse(
  mergeData(cards, columns), { fields }
);
export const mdCardSerializer = () => {
  // todo
};
