import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';
import { Button } from 'material-ui';
import { FormattedMessage } from 'react-intl';


class MergeCardsConfirmationDialog extends Component {
  mergeCards = () => {
    const { closeDialog, cards: { sourceCardId, targetCardId }, mergeCards } = this.props;
    mergeCards(this.context.socket, sourceCardId, targetCardId);
    closeDialog();
  }

  render() {
    const { closeDialog, open } = this.props;

    return (
      <Dialog onClose={closeDialog} open={open}>
        <DialogTitle>
          <FormattedMessage id="retro.confirm-group-card" />
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            <FormattedMessage id="navigation.cancel" />
          </Button>
          <Button onClick={this.mergeCards} color="primary">
            <FormattedMessage id="navigation.ok" />
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

MergeCardsConfirmationDialog.contextTypes = {
  socket: PropTypes.object.isRequired
};

MergeCardsConfirmationDialog.defaultProps = {
  cards: PropTypes.shape({
    sourceCardId: null,
    targetCardId: null
  })
};

MergeCardsConfirmationDialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  mergeCards: PropTypes.func.isRequired,
  cards: PropTypes.shape({
    sourceCardId: PropTypes.string,
    targetCardId: PropTypes.string
  }),
  open: PropTypes.bool.isRequired
};

export default MergeCardsConfirmationDialog;
