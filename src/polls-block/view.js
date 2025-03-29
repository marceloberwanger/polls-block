import { store, getContext } from '@wordpress/interactivity';

const { state } = store( 'buntywp-polls', {
	state: {
		get totalVoteCount() {
			const context = getContext();
			return context.totalVotes;
		},
		get userVoted() {
			const context = getContext();
			return context.userVoted;
		},
		get userSelection() {
			const context = getContext();
			const selected = parseInt(context.userSelection);
			const current = parseInt(context.options[context.item.id].id);
			console.log('userSelection:', selected, '===', current);
			return ( selected === current ) ? true : false;
		},
	},
	actions: {
		toggleVote: () => {
			const context = getContext();

			// Return, if already voted.
			if ( context.userVoted ) {
				return;
			}

			let index = context.item.id;
			context.options[ index ].votes =
				( context.options[ index ].votes || 0 ) + 1;
			context.userSelection = context.options[index].id;
			context.options = context.options;
			context.totalVotes = Number( context.totalVotes + 1 );
			context.userVoted = true;
			saveVoteToServer( context );
		},
		getPercentage: () => {
			const context = getContext();
			if ( context.totalVotes === 0 ) {
				return '0%';
			}
			let index = context.item.id;
			const percentage =
				( context.options[ index ].votes / context.totalVotes ) * 100;
			return `${ percentage.toFixed( 0 ) }%`;
		},
	},
	callbacks: {
		logIsPollOpen: () => {
			const { isOpen } = getContext();
		},
	},
} );

/**
 * Save the vote to the server via AJAX.
 *
 * @param {object} context Poll Context.
 */
function saveVoteToServer( context ) {
	fetch( state.ajaxUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams( {
			action: 'save_poll_vote',
			nonce: state.nonce,
			context: JSON.stringify( context ),
		} ),
	} )
		.then( ( response ) => response.json() )
		.then( ( data ) => {
			console.log( 'Vote saved:', data );
		} )
		.catch( ( error ) => {
			console.error( 'Error saving vote:', error );
		} );
}
