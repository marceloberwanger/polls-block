<?php
/**
 * Plugin Name:       Polls Block for Publishers
 * Description:       Create Interactive Polls for your WordPress site using Block. Customized version of the "Polls Block" plugin with improvements tailored for publishers.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Marcelo Berwanger
 * Author URI:        https://berwanger.digital
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       polls-block
 *
 * @package PollsBlock
 * 
 * Forked from the original plugin "Pools Block"by Bunty - https://github.com/BhargavBhandari90/polls-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Include database class
require_once plugin_dir_path( __FILE__ ) . 'includes/class-polls-block-db.php';

if ( ! function_exists( 'btwp_polls_block_init' ) ) {
	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	function btwp_polls_block_init() {
		register_block_type( __DIR__ . '/build/polls-block' );
	}
}
add_action( 'init', 'btwp_polls_block_init' );

/**
 * Create tables on plugin activation
 */
function btwp_polls_block_activate() {
	$db = new Polls_Block_DB();
	$db->create_tables();
}
register_activation_hook( __FILE__, 'btwp_polls_block_activate' );

/**
 * Store vote counts.
 */
function btwp_polls_handle_poll_vote() {
	// Security check.
	check_ajax_referer( 'btwp_polls_block_nonce', 'nonce' );

	if ( empty( $_POST['context'] ) ) {
		wp_send_json_error(
			array(
				'message' => esc_html__( 'Something went wrong. Try again later.', 'polls-block' ),
			)
		);
	}

	$context = json_decode( stripslashes( sanitize_text_field( wp_unslash( $_POST['context'] ) ) ) );
	$context = (array) $context;

	if ( isset( $context['item'] ) ) {
		unset( $context['item'] );
	}

	$user_selection = 0;
	if ( isset( $context['userSelection'] ) ) {
		$user_selection = $context['userSelection'];
		unset( $context['userSelection'] );
	}

	$post_id  = $context['postId'];
	$block_id = $context['blockId'];
	$is_auditable = isset( $context['isAuditable'] ) ? (bool) $context['isAuditable'] : false;

	$db = new Polls_Block_DB();
	$result = $db->record_vote( $post_id, $block_id, $user_selection, $is_auditable );

	if ( false === $result ) {
		wp_send_json_error(
			array(
				'message' => esc_html__( 'Failed to record vote. Please try again.', 'polls-block' ),
			)
		);
		return;
	}

	// Get updated vote counts
	$vote_counts = $db->get_vote_counts( $post_id, $block_id, $is_auditable );
	$total_votes = $db->get_total_votes( $post_id, $block_id, $is_auditable );

	wp_send_json_success(
		array(
			'message' => esc_html__( 'Vote recorded successfully', 'polls-block' ),
			'voteCounts' => $vote_counts,
			'totalVotes' => $total_votes,
		)
	);
}

add_action( 'wp_ajax_save_poll_vote', 'btwp_polls_handle_poll_vote' );
add_action( 'wp_ajax_nopriv_save_poll_vote', 'btwp_polls_handle_poll_vote' );
