<?php
/**
 * Render block.
 *
 * @package PollsBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $post;

$vote_options = array();
foreach ( $attributes['options'] as $key => $option ) {
	$unique_id      = wp_unique_id( 'option-' );
	$option['id']   = $key;
	$vote_options[] = $option;
}

$context = array(
	'postId'     => $post->ID,
	'options'    => $vote_options,
	'userVoted'  => false,
	'totalVotes' => 0,
	'blockId'    => $attributes['blockId'],
	'isAuditable' => isset( $attributes['isAuditable'] ) ? (bool) $attributes['isAuditable'] : false,
);

// Get vote counts from database
$db = new Polls_Block_DB();
$vote_counts = $db->get_vote_counts( $post->ID, $attributes['blockId'], $context['isAuditable'] );
$total_votes = $db->get_total_votes( $post->ID, $attributes['blockId'], $context['isAuditable'] );

// Update options with vote counts
foreach ( $context['options'] as &$option ) {
	$option['votes'] = isset( $vote_counts[ $option['id'] ] ) ? $vote_counts[ $option['id'] ] : 0;
}

$context['totalVotes'] = $total_votes;

$meta_key     = 'poll-' . md5( $attributes['blockId'] );
$meta_context = get_post_meta( $post->ID, $meta_key, true );
$meta_context = json_decode( wp_json_encode( $meta_context ), true );

if ( ! empty( $meta_context ) ) {
	$context = $meta_context;
}

$context['userVoted'] = false;
$context['userSelection'] = -1;

wp_interactivity_state(
	'buntywp-polls',
	array(
		'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
		'nonce'     => wp_create_nonce( 'btwp_polls_block_nonce' ),
		'totalVote' => $total_votes,
		'userVoted' => false,
	)
);

?>
<div
	<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
	data-wp-interactive="buntywp-polls"
	<?php echo wp_kses_data( wp_interactivity_data_wp_context( $context ) ); ?>
	data-wp-watch="callbacks.logIsPollOpen"
>
	<div class="poll-question">
		<h3><?php echo esc_html( $attributes['question'] ); ?></h3>
	</div>
	<template data-wp-each="context.options">
		<div
			class="poll-option"
			data-wp-class--cantvote="state.userVoted"
		>
			<label
				class="poll-option-label"
				data-wp-on--click="actions.toggleVote">
				<span class="poll-option-text" data-wp-text="context.item.option"></span>
				<span
					class="vote-confirmed"
					data-wp-class--hidden="!state.userSelection"
				>
					<svg viewBox="0 0 24 24" class="vote-icon" xmlns="http://www.w3.org/2000/svg">
						<circle cx="12" cy="12" r="10" />
						<path d="M8 12.5l2.5 2.5L16 9" />
					</svg>
				</span>
				<span class="poll-option-vote" data-wp-class--hidden="!state.userVoted" data-wp-text="actions.getPercentage"></span>
			</label>
			<div class="progress-bar"
				data-wp-on--click="actions.toggleVote"
				data-wp-style--width="actions.getPercentage"
				data-wp-class--voted="state.userVoted"
				data-wp-class--hidden="!state.userVoted">
				<div class="progress-fill"></div>
			</div>
		</div>
	</template>
	<div class="poll-footer">
		<div class="total-votes">
			<span data-wp-text="state.totalVoteCount"></span> <?php echo wp_kses_data( _n( 'vote', 'votes', $context['totalVotes'], 'polls-block' ) ); ?>
		</div>
	</div>
</div>