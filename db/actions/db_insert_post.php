<?php

require '../db_connect.php';

$stmt = $mysqli->stmt_init();


// Save new posts
$save_post = 'INSERT INTO post (fullName, imgURL, likes) VALUES (?, ?, ?)';

if ( $stmt->prepare($save_post) ) {

	$full_name = $_GET['name'];
	$img_url = $_GET['link'];
	$likes = $_GET['likes'];

	$stmt->bind_param('ssi', $full_name, $img_url, $likes);

	$stmt->execute();

}

$stmt->close();

$mysqli->close();


?>