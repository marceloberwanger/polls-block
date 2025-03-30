import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, TextControl, PanelBody, ToggleControl } from '@wordpress/components';
import { plus, closeSmall } from '@wordpress/icons';
import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { question, options, blockId, isAuditable, isPollOpen, showResultsInNewPage } = attributes;

	// Set a unique blockId if not already set.
	useEffect( () => {
		if ( ! blockId ) {
			setAttributes( { blockId: clientId } );
		}
	}, [ blockId, clientId, setAttributes ] );

	const blockProps = useBlockProps({
		'data-wp-interactive': 'buntywp-polls',
		'data-wp-watch': 'callbacks.logIsPollOpen',
	});

	// Add a new option.
	const addOption = () => {
		setAttributes( { options: [ ...options, { option: '', votes: 0 } ] } );
	};

	// Remove an option.
	const removeOption = ( index ) => {
		const newOptions = [ ...options ];
		newOptions.splice( index, 1 );
		setAttributes( { options: newOptions } );
	};

	// Update option text.
	const updateOption = ( index, value ) => {
		const newOptions = [ ...options ];
		newOptions[index] = { ...newOptions[index], option: value };
		setAttributes( { options: newOptions } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Poll Settings', 'polls-block')}>
					<ToggleControl
						label={__('Is auditable', 'polls-block')}
						checked={isAuditable}
						onChange={(value) => setAttributes({ isAuditable: value })}
						help={isAuditable ? __('Votes will be stored with IP address and user agent information.', 'polls-block') : __('Votes will be stored without identifying information for better performance.', 'polls-block')}
					/>
					<ToggleControl
						label={__('Is poll open for voting', 'polls-block')}
						checked={isPollOpen}
						onChange={(value) => setAttributes({ isPollOpen: value })}
						help={isPollOpen ? __('Poll is currently open for voting.', 'polls-block') : __('Poll is currently closed.', 'polls-block')}
					/>
					<ToggleControl
						label={__('Show results in new page', 'polls-block')}
						checked={showResultsInNewPage}
						onChange={(value) => setAttributes({ showResultsInNewPage: value })}
						help={showResultsInNewPage ? __('Results will be reload the same page.', 'polls-block') : __('Results will be displayed inline.', 'polls-block')}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps } key={ blockId }>
				<div className="poll-block-editor">
					<div className="poll-question">
						<RichText
							tagName="h3"
							placeholder={ __( 'Ask a question', 'polls-block' ) }
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
									__( 'Choice ', 'polls-block' ) + ( index + 1 )
								}
								value={ option.option }
								onChange={ ( value ) =>
									updateOption( index, value )
								}
							/>
							<Button
								icon={ closeSmall }
								isSmall
								label={ __( 'Remove option', 'polls-block' ) }
								onClick={ () => removeOption( index ) }
								className="poll-remove-button"
								disabled={ options.length <= 2 }
							></Button>
							{ index === options.length - 1 && (
								<Button
									icon={ plus }
									onClick={ addOption }
									className="poll-add-button"
									label={ __( 'Add option', 'polls-block' ) }
								/>
							) }
						</div>
					) ) }
				</div>
			</div>
		</>
	);
}
