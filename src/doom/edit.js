/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const blockProps = useBlockProps({
		className: 'wp-block-jonathanbossenger-doom',
	});

	return (
		<div { ...blockProps }>
			<div className="container">
				<div style={{
					background: '#333',
					width: '640px',
					height: '400px',
					maxWidth: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					border: '2px dashed #ccc',
					borderRadius: '8px',
					position: 'relative'
				}}>
					<div style={{
						textAlign: 'center',
						color: '#f80',
						fontSize: '18px',
						fontWeight: 'bold'
					}}>
						{ __( '🎮 Doom Game Block', 'doom' ) }
						<br />
						<small style={{ color: '#aaa', fontSize: '14px' }}>
							{ __( 'Game will load on the frontend', 'doom' ) }
						</small>
					</div>
				</div>
			</div>
		</div>
	);
}
