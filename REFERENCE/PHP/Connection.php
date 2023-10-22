<?php
	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "7576_book_binding_db";

	if(!$con = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname))
	{
		die("failed to connect!");
	}
?>