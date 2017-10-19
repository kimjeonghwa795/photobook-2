/**
 * Photobook Tabs Container
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import { connect } from 'react-redux';

// Actions
import * as photobookActions from '@redux/photobook/actions';

// The component we're mapping to
import EditBook from './EditBookView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    images: state.photobook.images,
});

// Any actions to map to the component?
const mapDispatchToProps = dispatch => ({
    addImage: photobookActions.addImage,
    removeImage: photobookActions.removeImage,
    editImage: photobookActions.editImage,
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);
