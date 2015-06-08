<?php

require '../db_connect.php';

$stmt = $mysqli->stmt_init();

// Remove old posts before adding new
$empty_posts = 'TRUNCATE TABLE post';

if ( $stmt->prepare($empty_posts) ) {

	$stmt->execute();

}

$stmt->close();

$mysqli->close();


?>