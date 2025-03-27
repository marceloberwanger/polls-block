<?php
/**
 * Database handler for Polls Block
 *
 * @package PollsBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class Polls_Block_DB
 */
class Polls_Block_DB {
	/**
	 * Table name for auditable votes
	 *
	 * @var string
	 */
	private $auditable_table;

	/**
	 * Table name for non-auditable votes
	 *
	 * @var string
	 */
	private $votes_table;

	/**
	 * Constructor
	 */
	public function __construct() {
		global $wpdb;
		$this->auditable_table = $wpdb->prefix . 'pollsblock_auditable_votes';
		$this->votes_table     = $wpdb->prefix . 'pollsblock_votes';
	}

	/**
	 * Create tables on plugin activation
	 *
	 * @return void
	 */
	public function create_tables() {
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();

		$sql = array();

		// Auditable votes table
		$sql[] = "CREATE TABLE IF NOT EXISTS {$this->auditable_table} (
			id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
			post_id BIGINT UNSIGNED NOT NULL,
			block_id VARCHAR(255) NOT NULL,
			option_id INT NOT NULL,
			ip_address VARCHAR(45) NOT NULL,
			user_agent TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (id),
			KEY post_block (post_id, block_id)
		) $charset_collate;";

		// Non-auditable votes table
		$sql[] = "CREATE TABLE IF NOT EXISTS {$this->votes_table} (
			id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
			post_id BIGINT UNSIGNED NOT NULL,
			block_id VARCHAR(255) NOT NULL,
			option_id INT NOT NULL,
			PRIMARY KEY (id),
			KEY post_block (post_id, block_id)
		) $charset_collate;";

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		foreach ( $sql as $query ) {
			dbDelta( $query );
		}
	}

	/**
	 * Record a vote
	 *
	 * @param int    $post_id Post ID.
	 * @param string $block_id Block ID.
	 * @param int    $option_id Option ID.
	 * @param bool   $is_auditable Whether the poll is auditable.
	 * @return bool|int False on failure, number of rows affected on success.
	 */
	public function record_vote( $post_id, $block_id, $option_id, $is_auditable = false ) {
		global $wpdb;

		if ( $is_auditable ) {
			return $wpdb->insert(
				$this->auditable_table,
				array(
					'post_id'    => $post_id,
					'block_id'   => $block_id,
					'option_id'  => $option_id,
					'ip_address' => $this->get_client_ip(),
					'user_agent' => isset( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '',
				),
				array( '%d', '%s', '%d', '%s', '%s' )
			);
		}

		return $wpdb->insert(
			$this->votes_table,
			array(
				'post_id'   => $post_id,
				'block_id'  => $block_id,
				'option_id' => $option_id,
			),
			array( '%d', '%s', '%d' )
		);
	}

	/**
	 * Get vote counts for a poll
	 *
	 * @param int    $post_id Post ID.
	 * @param string $block_id Block ID.
	 * @param bool   $is_auditable Whether the poll is auditable.
	 * @return array Array of vote counts by option.
	 */
	public function get_vote_counts( $post_id, $block_id, $is_auditable = false ) {
		global $wpdb;

		$table = $is_auditable ? $this->auditable_table : $this->votes_table;
		$query = $wpdb->prepare(
			"SELECT option_id, COUNT(*) as count 
			FROM {$table} 
			WHERE post_id = %d AND block_id = %s 
			GROUP BY option_id",
			$post_id,
			$block_id
		);

		$results = $wpdb->get_results( $query, ARRAY_A );
		$counts  = array();

		foreach ( $results as $row ) {
			$counts[ $row['option_id'] ] = (int) $row['count'];
		}

		return $counts;
	}

	/**
	 * Get total votes for a poll
	 *
	 * @param int    $post_id Post ID.
	 * @param string $block_id Block ID.
	 * @param bool   $is_auditable Whether the poll is auditable.
	 * @return int Total number of votes.
	 */
	public function get_total_votes( $post_id, $block_id, $is_auditable = false ) {
		global $wpdb;

		$table = $is_auditable ? $this->auditable_table : $this->votes_table;
		$query = $wpdb->prepare(
			"SELECT COUNT(*) as total 
			FROM {$table} 
			WHERE post_id = %d AND block_id = %s",
			$post_id,
			$block_id
		);

		return (int) $wpdb->get_var( $query );
	}

	/**
	 * Get client IP address
	 *
	 * @return string
	 */
	private function get_client_ip() {
		$ipaddress = '';

		if ( isset( $_SERVER['HTTP_CLIENT_IP'] ) ) {
			$ipaddress = sanitize_text_field( wp_unslash( $_SERVER['HTTP_CLIENT_IP'] ) );
		} elseif ( isset( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
			$ipaddress = sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_FORWARDED_FOR'] ) );
		} elseif ( isset( $_SERVER['HTTP_X_FORWARDED'] ) ) {
			$ipaddress = sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_FORWARDED'] ) );
		} elseif ( isset( $_SERVER['HTTP_FORWARDED_FOR'] ) ) {
			$ipaddress = sanitize_text_field( wp_unslash( $_SERVER['HTTP_FORWARDED_FOR'] ) );
		} elseif ( isset( $_SERVER['HTTP_FORWARDED'] ) ) {
			$ipaddress = sanitize_text_field( wp_unslash( $_SERVER['HTTP_FORWARDED'] ) );
		} elseif ( isset( $_SERVER['REMOTE_ADDR'] ) ) {
			$ipaddress = sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) );
		}

		return $ipaddress;
	}
} 