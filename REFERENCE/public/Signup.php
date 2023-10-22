<?php
    ob_start();
    session_start();

    include("../PHP/Connection.php");
    include("../PHP/Functions.php");

    $user_data = check_login($con);

    if ($user_data !== NULL) header("Location: HomePage.php");
?>

<!DOCTYPE html>
<html>
    <head>
        <title>7576 Book Binding Services</title>
        <link rel="stylesheet" type="text/css" href="../CSS/Signup.css">
    </head>
    <body>
        <!-- HEADER -->
        <header>
            <div class="header-container" id="header-container">
                <div class="header-left-container">
                    <div class="header-left" id="header-left">
                        <a class="header-left-content" id ="header-left-content" href="Login.PHP" style="position: sticky;">Login</a>
                    </div>
                </div>
                <div class="header-logo-container" id="header-logo-container">
                    <a href="Homepage.php"><img class="header-logo" src="../assets/HomePage/Header/CompanyLogo.png" alt="Company Logo"></a>
                </div>
                <div class="header-right-container" id="header-right-container">
                    <div class="header-right" id="header-right">
                        <a class="header-right-content" id ="header-right-content" href="HomePage.php">Home</a>
                    </div>
                </div>
            </div>
            <!-- FLOATING LINKS -->
            <section class="floating-links" id="floating-links">
                <a href="https://www.facebook.com/"><img src="../assets/HomePage/Header/FloatingLinks/Facebook.png" class="floating-links-facebook"></a>
                <a href="https://www.instagram.com/"><img src="../assets/HomePage/Header/FloatingLinks/Instagram.png"  class="floating-links-instagram"></div></a>
                <a href="https://www.youtube.com/"><img src="../assets/HomePage/Header/FloatingLinks/Youtube.png"  class="floating-links-youtube"></div></a>
                <a href="https://twitter.com/"><img src="../assets/HomePage/Header/FloatingLinks/Twitter.png"  class="floating-links-twitter"></div></a>
            </section>
        </header>
        <!-- MAIN -->
        <main id="main">
            <!-- LOGIN -->
            <section class="main-login-container" id="main-login-container">
                <div class="main-login-name-container">
                    <p class="main-login-name">Sign Up</p>
                </div>
                <div class="main-login-line-container">
                    <hr class="main-login-line">
                </div>
                <form method="post">
                    <div class="main-login-error-container" id="main-login-error-container">
                        <p class="main-login-error" id="main-login-error">User Already Exists!</P>
                    </div>
                    <div class="main-login-form-container">
                        <div class="main-login-form-content-container-Email" id="main-login-form-content-container-Email">
                            <label class="main-login-form-content" id="main-login-form-content">Email:</label>
                            <input class="main-login-form-input" id="main-login-form-input" type="text" name="email"></input>
                        </div>
                        <div class="main-login-form-content-container-Password" id="main-login-form-content-container-Password">
                            <label class="main-login-form-content" id="main-login-form-content">Password:</label>
                            <input class="main-login-form-input" id="main-login-form-input" type="password" name="password"></input>
                        </div>
                        <div class="main-login-form-content-container-Fname" id="main-login-form-content-container-Fname">
                            <label class="main-login-form-content" id="main-login-form-content">First Name:</label>
                            <input class="main-login-form-input" id="main-login-form-input" type="text" name="fname"></input>
                        </div>
                        <div class="main-login-form-content-container-Lname" id="main-login-form-content-container-Lname">
                            <label class="main-login-form-content" id="main-login-form-content">Last Name:</label>
                            <input class="main-login-form-input" id="main-login-form-input" type="text" name="lname"></input>
                        </div>
                        <div class="main-login-form-content-container-Mname" id="main-login-form-content-container-Mname">
                            <label class="main-login-form-content" id="main-login-form-content">Middle Name:</label>
                            <input class="main-login-form-input" id="main-login-form-input" type="text" name="mname"></input>
                        </div>
                        <div class="main-login-form-content-container-Address" id="main-login-form-content-container-Address">
                            <label class="main-login-form-content" id="main-login-form-content">Address:</label>
                            <input class="main-login-form-input" id="main-login-form-input" type="text" name="address"></input>
                        </div>
                    </div>
                    <div class="main-login-button-container">
                        <div class="main-login-button-enter-container" id="main-login-button-enter-container">
                            <input class="main-login-button-enter" id="main-login-button-enter" type="submit" value="Enter"></input>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    </body>
</html>

<?php
    include("../PHP/Connection.php");

    if($_SERVER['REQUEST_METHOD'] === "POST")
    {
        //something was posted
        $email = $_POST['email'];
        $password = $_POST['password'];
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        $mname = $_POST['mname'];
        $address = $_POST['address'];

        if(!empty($email) && !is_numeric($email) && !empty($password) && !empty($fname) && !is_numeric($fname) && !empty($lname) && !is_numeric($lname) && !empty($mname) && !is_numeric($mname) && !empty($address) && !is_numeric($address))
		{
            //check if input exists in db
            $query = "select * from customer_information where Email = '$email' limit 1";
            $result = mysqli_query($con, $query);

            if($result && mysqli_num_rows($result) > 0)
            {
                echo '<script>document.getElementById("main-login-error-container").style.display = "block";</script>';
                die;
            }

			//save to database
			$customer_id = customerID($con);
            $mi = "";
            $mid = explode(" ", ucwords($mname));
            foreach ($mid as $w) {
                $mi .= mb_substr($w, 0, 1);
                $mi .= '.';
            }
            $name = ucwords($lname).', '.$mi.' '.ucwords($fname);
			$query = "insert into customer_information (CustomerID,Email,Password,CustomerName,Address) values ('$customer_id','$email','$password','$name','$address')";

			mysqli_query($con, $query);

			header("Location: login.php");
			die;
		}
        else
        {
            echo '<script>document.getElementById("main-login-error-container").style.display = "block";
            document.getElementById("main-login-error").innerHTML = "Invalid Input!";</script>';
        }
        die;
    }

    function customerID($con)
	{
		$query = "select CustomerID from customer_information";

		$result = mysqli_query($con,$query);
		$exist = mysqli_num_rows($result) + 1;
		if ($exist < 10) $number = "0000";
		else if ($exist < 100) $number = "000";
		else if ($exist < 1000) $number = "00";
		else if ($exist < 10000) $number = "0";
		else 
		{
			$customer_id = "C".$exist;
			return $customer_id;
		}

		$customer_id = "C".$number.$exist;
		return $customer_id;
	}
?>