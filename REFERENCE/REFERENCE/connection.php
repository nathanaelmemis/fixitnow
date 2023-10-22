<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "customer_information";

if(!$con = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname))
{

	die("failed to connect!");
}

?>