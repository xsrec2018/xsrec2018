import { withMobileDialog } from 'material-ui/Dialog';
import { formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import ExportCardsDialog from '../../components/ExportCardsDialog';
import { openExportDialog } from '../../actions/layout';
import { LAYOUT_EXPORT_DIALOG_OPEN_KEY } from '../../reducers/layout';
import { EXPORT_METHOD_FIELD } from '../../components/ExportCardsDialog/ExportCardsDialog';
import { RETRO_CARDS_KEY, RETRO_COLUMNS_KEY } from '../../reducers/retro';

const EXPORT_METHOD = 'method';
const formSelector = formValueSelector(EXPORT_METHOD);

const mapStateToProps = state => ({
  method: formSelector(state, EXPORT_METHOD) || 'csv',
  initialValues: {
    method: 'csv'
  },
  open: state.layout[LAYOUT_EXPORT_DIALOG_OPEN_KEY],
  cards: state.retro[RETRO_CARDS_KEY],
  columns: state.retro[RETRO_COLUMNS_KEY]
});

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(openExportDialog(false))
});

export default withMobileDialog({ breakpoint: 'xs' })(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
      form: EXPORT_METHOD,
      enableReinitialize: true,
      fields: [EXPORT_METHOD_FIELD]
    })(ExportCardsDialog)
  )
);
