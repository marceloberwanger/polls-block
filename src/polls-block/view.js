import { store, getContext, withScope } from '@wordpress/interactivity';

withScope(() => {
	const context = getContext();
	const storageKey = `poll_voted_${context.blockId}`;

	if (localStorage.getItem(storageKey) === '1') {
		context.userVoted = true;
		localStorage.removeItem(storageKey);
	}
});

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
			return ( selected === current ) ? true : false;
		},
		get isPollOpen() {
			const context = getContext();
			return context.isPollOpen;
		},
	},
	actions: {
		toggleVote: () => {
			const context = getContext();

			// Return if poll is closed or already voted
			if ( !context.isPollOpen || context.userVoted ) {
				return;
			}

			const container = document.querySelector('.poll-container');
			const loader = document.querySelector('.poll-loader');
		
			if (container) container.classList.add('hidden');
			if (loader) loader.classList.remove('hidden');

			let index = context.item.id;
			context.options[ index ].votes =
				( context.options[ index ].votes || 0 ) + 1;
			context.userSelection = context.options[index].id;
			context.options = context.options;
			context.totalVotes = Number( context.totalVotes + 1 );

			context.userVoted = true;
			if(context.showResultsInNewPage) {
				context.userVoted = false;
			}

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
		initUserVoteState: () => {
			const context = getContext();
			const blockId = context.blockId;
		
			const voted = localStorage.getItem(`poll_voted_${blockId}`);
			const selection = localStorage.getItem(`poll_selection_${blockId}`);
		
			if (voted === '1' && selection !== null) {
				const selectedId = parseInt(selection);
		
				// Apply vote manually to cached result
				const option = context.options.find(opt => parseInt(opt.id) === selectedId);
				if (option) {
					option.votes += 1;
					context.totalVotes += 1;
				}
		
				context.userVoted = true;
				context.userSelection = selectedId;
		
				localStorage.removeItem(`poll_voted_${blockId}`);
				localStorage.removeItem(`poll_selection_${blockId}`);
			}
		},
		reloadPoll: () => {
			window.location.reload();
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

			if (context.showResultsInNewPage) {
				localStorage.setItem(`poll_voted_${context.blockId}`, '1');
				localStorage.setItem(`poll_selection_${context.blockId}`, context.userSelection);

				window.location.reload();
			}
		} )
		.catch( ( error ) => {
			console.error( 'Error saving vote:', error );
		} );
}
