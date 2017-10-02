/**
 * Photobook Tabs Container
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import { connect } from 'react-redux';

// The component we're mapping to
import PhotobookTabsRender from './BrowseView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  tabs: state.photobook.tabs || [],
});

// Any actions to map to the component?
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotobookTabsRender);
