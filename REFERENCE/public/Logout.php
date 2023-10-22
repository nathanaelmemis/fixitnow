<?php

session_start();

if(isset($_SESSION['customerid']))
{
	unset($_SESSION['customerid']);
	unset($_SESSION['admin']);
}

header("Location: HomePage.php");
die;