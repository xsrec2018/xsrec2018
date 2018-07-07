import { withMobileDialog } from 'material-ui/Dialog';
import { connect } from 'react-redux';
import MergeCardsConfirmationDialog from '../../components/MergeCardsConfirmationDialog';
import { openMergeCardsDialog } from '../../actions/layout';
import { cardMerge } from '../../actions/card';
import { LAYOUT_MERGE_CARDS_DIALOG_OPEN_KEY, LAYOUT_MERGE_CARDS_DIALOG_PAYLOAD } from '../../reducers/layout';


const mapStateToProps = state => ({
  open: state.layout[LAYOUT_MERGE_CARDS_DIALOG_OPEN_KEY],
  cards: state.layout[LAYOUT_MERGE_CARDS_DIALOG_PAYLOAD]
});

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(openMergeCardsDialog(false)),
  mergeCards: (socket, sourceCardId, targetCardId) => dispatch(
    cardMerge(socket, sourceCardId, targetCardId)
  )
});

export default withMobileDialog({ breakpoint: 'xs' })(
  connect(mapStateToProps, mapDispatchToProps)(MergeCardsConfirmationDialog)
);
