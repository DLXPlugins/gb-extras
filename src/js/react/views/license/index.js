import React from 'react';

import { createRoot } from 'react-dom/client';
import License from './license';

const container = document.getElementById( 'dlx-gb-extras-license' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<License />
	</React.StrictMode>
);
