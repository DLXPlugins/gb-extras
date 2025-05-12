import {
	v1Blocks,
	v2Blocks,
	v1VariationNames,
	v2VariationNames,
} from './BlockTypes';
import uniqueId from 'lodash.uniqueid';

const uniqueIds = [];
/**
 * Replace uniqueId attribute with new uniqueId.
 *
 * @param {Object} block The block object.
 *
 * @return {Object} The block object.
 */
const replaceUniqueIds = ( block ) => {
	const blockClientId = block.clientId;
	const blockAttributes = block.attributes;
	const blockName = block.name;

	// If block has a `uniqueId` attribute, generate a new one.
	if ( 'undefined' !== typeof blockAttributes.uniqueId ) {
		const newUniqueId = generateUniqueId( blockClientId );
		block.attributes.uniqueId = newUniqueId;
	}

	if ( ! v1Blocks.includes( blockName ) && ! v2Blocks.includes( blockName ) ) {
		if (
			'undefined' !== typeof block.innerBlocks &&
			block.innerBlocks.length > 0
		) {
			block.innerBlocks = block.innerBlocks.map( ( innerBlock ) => {
				return replaceUniqueIds( innerBlock );
			} );
		}
		return block;
	}

	// Now check if block has innerBlocks.
	if (
		'undefined' !== typeof block.innerBlocks &&
		block.innerBlocks.length > 0
	) {
		block.innerBlocks = block.innerBlocks.map( ( innerBlock ) => {
			return replaceUniqueIds( innerBlock );
		} );
	}

	return block;
};

/**
 * Return and generate a new unique ID.
 *
 * @param {string} clientId The client ID of the block.
 *
 * @return {string} The uniqueId.
 */
const generateUniqueId = ( clientId ) => {
	// Get the substr of current client ID for prefix.
	const prefix = clientId.substring( 2, 9 ).replace( '-', '' );
	const newUniqueId = uniqueId( prefix );

	// Make sure it isn't in the array already. Recursive much?
	if ( uniqueIds.includes( newUniqueId ) ) {
		return generateUniqueId();
	}
	return newUniqueId;
};

export { replaceUniqueIds, generateUniqueId };
