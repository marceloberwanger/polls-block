import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Save function for the Poll Block
 */
export default function save( { attributes } ) {
	const { question, options, blockId } = attributes;
	console.log( 'attributes', attributes );
	return null;
}
