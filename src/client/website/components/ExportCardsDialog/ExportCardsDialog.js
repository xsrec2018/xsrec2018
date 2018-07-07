import React, { Component } from 'react';
import { CSVDownload } from 'react-csv';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import { Button, Radio, FormControlLabel } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import { RadioGroup } from 'redux-form-material-ui';
import { csvCardSerializer } from '../../serializers/cards';

export const EXPORT_METHOD_FIELD = 'method';

const availableMethods = {
  CSV: true,
  MD: false
};

class ExportCardsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { csvContent: null };
  }

  onExport = () => {
    const { closeDialog, [EXPORT_METHOD_FIELD]: method, cards, columns } = this.props;

    switch (method) {
      case 'csv':
        this.setState({
          csvContent: csvCardSerializer(cards, columns)
        });
        break;
      default:
        break;
    }

    closeDialog();
  }

  render() {
    const { closeDialog, open } = this.props;

    return (
      <Dialog onClose={closeDialog} open={open}>
        <DialogTitle>
          <FormattedMessage id="export-dialog.header" />
        </DialogTitle>
        <DialogContent>
          <FormattedMessage id="export-dialog.description" />
          <Field name={EXPORT_METHOD_FIELD} component={RadioGroup} >
            <FormControlLabel disabled={!availableMethods.CSV} value="csv" control={<Radio />} label="CSV" />
            <FormControlLabel disabled={!availableMethods.MD} value="markdown" control={<Radio />} label="Markdown" />
          </Field>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            <FormattedMessage id="navigation.cancel" />
          </Button>
          <Button
            onClick={this.onExport}
            color="primary"
          >
            <FormattedMessage id="retro.export" />
          </Button>
        </DialogActions>
        {this.state.csvContent ? <CSVDownload data={this.state.csvContent} /> : ''}
      </Dialog>
    );
  }
}


ExportCardsDialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  [EXPORT_METHOD_FIELD]: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    columnId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  })).isRequired
};

export default ExportCardsDialog;
