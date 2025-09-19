import register from 'preact-custom-element';
import { stylesheets } from 'virtual:shadow-styles/stylesheets';

import { ViewCollection } from '../pages/ViewCollection/ViewCollection.tsx';

register(ViewCollection, 'view-collection', ['collectionid'], {
  shadow: true,
  adoptedStyleSheets: stylesheets,
});
