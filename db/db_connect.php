<?php

if ( !defined('DB_HOST') ) {

	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PASSWORD', 'password');
	define('DB_NAME', 'nacka_contest');

}

// Connect to database
$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// utf8mb4 to support emojis, needs to be set in database as well
mysqli_set_charset($mysqli, 'utf8mb4');

if ( $mysqli->connect_errno ) {

	echo 'Could not connect to database.<br />' . $mysqli->conntect_error;

	$mysqli->close();

	exit();

}

?>