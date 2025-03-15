import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button, TextControl } from '@wordpress/components';
import { plus, closeSmall } from '@wordpress/icons';

/**
 * Editor styles
 */
import './editor.scss';

/**
 * Edit function for the Poll Block
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const { question, options, blockId } = attributes;

	console.log( 'options', options );

	// Set a unique blockId if not already set.
	useEffect( () => {
		if ( ! blockId ) {
			setAttributes( { blockId: clientId } );
		}
	}, [ blockId, clientId, setAttributes ] );

	// Function to add a new option.
	const addOption = () => {
		setAttributes( { options: [ ...options, { option: '', votes: 0 } ] } );
	};

	// Function to remove an option.
	const removeOption = ( index ) => {
		const newOptions = [ ...options ];
		newOptions.splice( index, 1 );
		setAttributes( { options: newOptions } );
	};

	// Function to update option text.
	const updateOptionText = ( index, value ) => {
		console.log( 'options', options );

		const updatedOptions = options.map( ( option, i ) =>
			i === index ? { ...option, option: value } : option
		);
		setAttributes( { options: updatedOptions } );
		// const updatedOptions = [ ...options ];
		// updatedOptions[ index ][ key ] = value;
		// setAttributes( { options: updatedOptions } );
	};

	return (
		<div { ...useBlockProps() } key={ blockId }>
			<div className="poll-block-editor">
				<div className="poll-question">
					<RichText
						tagName="h3"
						placeholder={ __(
							'Ask a question',
							'custom-poll-block'
						) }
						value={ question }
						onChange={ ( value ) =>
							setAttributes( { question: value } )
						}
					/>
				</div>
				{ options.map( ( option, index ) => (
					<div key={ index } className="poll-option">
						<TextControl
							placeholder={
								__( 'Choice ', 'custom-poll-block' ) +
								( index + 1 )
							}
							value={ option.option }
							onChange={ ( value ) =>
								updateOptionText( index, value )
							}
						/>
						<Button
							icon={ closeSmall }
							isSmall
							label={ __( 'Remove option', 'custom-poll-block' ) }
							onClick={ () => removeOption( index ) }
							className="poll-remove-button"
							disabled={ options.length <= 2 }
						></Button>
						{ index === options.length - 1 && (
							<Button
								icon={ plus }
								onClick={ addOption }
								className="poll-add-button"
								label={ __(
									'Add option',
									'custom-poll-block'
								) }
							/>
						) }
					</div>
				) ) }
			</div>
		</div>
	);
}
