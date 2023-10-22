<?php
	function check_login($con)
	{
		if(isset($_SESSION['customerid']))
		{
			$id = $_SESSION['customerid'];
			$query = "select * from customer_information where CustomerID = '$id' limit 1";

			$result = mysqli_query($con,$query);
			if($result && mysqli_num_rows($result) > 0)
			{
				$user_data = mysqli_fetch_assoc($result);
				return $user_data;
			}
		}

		return NULL;
		die;
	}
?>