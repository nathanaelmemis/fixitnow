<?php
    ob_start();
    session_start();

    include("../PHP/Connection.php");
    include("../PHP/Functions.php");

	$user_data = check_login($con);
    if(isset($_SESSION['admin'])) $admin = $_SESSION['admin'];

    if ($user_data == NULL) header("Location: Login.php");
    if ($admin == 1) header("Location: HomePage.php");
?>

<!DOCTYPE html>
<html>
    <head>
        <title>7576 Book Binding Services</title>
        <link rel="stylesheet" type="text/css" href="../CSS/Inquire.css">
        <script src="../JS/Inquire.js"></script>
    </head>
    <body>
        <!-- HEADER -->
        <header>
            <div class="header-container" id="header-container">
                <div class="header-left-container">
                    <div class="header-left" id="header-left">
                        <a class="header-left-content" id ="header-left-content" href="HomePage.php">Home</a>
                    </div>
                </div>
                <div class="header-logo-container" id="header-logo-container">
                    <a href="Homepage.php"><img class="header-logo" src="../assets/HomePage/Header/CompanyLogo.png" alt="Company Logo"></a>
                </div>
                <div class="header-right-container" id="header-right-container">
                    <div class="header-right" id="header-right">
                        <a class="header-right-content" id ="header-right-content" href="Profile.php"></a>
                    </div>
                </div>
                <div class="header-right-container-compress" id="header-right-container-compress">
                    <div class="header-right" id="header-right">
                        <a class="header-right-content" id="header-right-content-compress" href="Profile.php">Profile</a>
                    </div>
                </div>
                <?php
                    if ($user_data != NULL)
                    {
                        $last_name = strtok($user_data['CustomerName'], ",");
                        echo '<script>document.getElementById("header-right-content").innerHTML = "Welcome, '.$last_name.'";</script>';
                    }
                ?>
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
            <!-- ORDER -->
            <section class="main-order-container" id="main-order-container">
                <div class="main-order-name-container">
                    <p class="main-order-name">Inquire</p>
                </div>
                <div class="main-order-line-container">
                    <hr class="main-order-line">
                </div>
                <form method="post">
                    <div id="add-project">
                        <div class="main-order-form-container">
                            <p class="main-order-form-label" id="main-order-form-label">Project 1</p>
                            <div class="main-order-error-container" id="main-order-error-container">
                                <p class="main-order-error" id="main-order-error">Invalid Project Name or Book Quantity!</P>
                            </div> 
                            <div class="main-order-form-content-container-Project-Name" id="main-order-form-content-container-Project-Name">
                                <label class="main-order-form-content" id="main-order-form-content">Project Name:</label>
                                <input class="main-order-form-input" id="main-order-form-input" type="text" name="projectname1"></input>
                            </div>
                            <div class="main-order-form-content-container-Book-Quantity" id="main-order-form-content-container-Book-Quantity">
                                <label class="main-order-form-content" id="main-order-form-content">Book Quantity:</label>
                                <input class="main-order-form-input" id="main-order-form-input" type="text" name="bookquantity1"></input>
                            </div>
                            <div class="main-order-form-content-container-Binding-Type" id="main-order-form-content-container-Binding-Type">
                                <label class="main-order-form-content" id="main-order-form-content">Binding Type:</label>
                                <select class="main-order-form-input" id="main-order-form-input" name="bindingtype1">
                                    <option value="M00006">Sewn Binding</option>
                                    <option value="M00002">Glue Binding</option>
                                    <option value="M00007">Staple Binding</option>
                                </select>
                            </div>
                            <div class="main-order-form-content-container-Cover-Material" id="main-order-form-content-container-Cover-Material">
                                <label class="main-order-form-content" id="main-order-form-content">Cover Material:</label>
                                <select class="main-order-form-input" id="main-order-form-input" name="covermaterial1">
                                    <option value="M00003">Card Board 1530gsm</option>
                                    <option value="M00004">Card Board 1510gsm</option>
                                    <option value="M00005">Card Board 1450gsm</option>
                                </select>
                            </div>
                            <div class="main-order-form-content-container-Fly-Leaf" id="main-order-form-content-container-Fly-Leaf">
                                <label class="main-order-form-content" id="main-order-form-content">Fly Leaf:</label>
                                <input class="main-order-form-input-Fly-Leaf" id="main-order-form-input-Fly-Leaf" type="checkbox" name="flyleaf1"></input>
                            </div>
                            <div class="main-order-line-container">
                                <hr class="main-order-line">
                            </div>
                        </div>
                    </div>
                    <div class="main-order-form-content-container-Payment-Delivery" id="main-order-form-content-container-Payment-Delivery">
                        <label class="main-order-form-content" id="main-order-form-content">Mode of Payment/Delivery:</label>
                        <select class="main-order-form-input" id="main-order-form-input" name="paymentdelivery">
                            <option value="Bank Transfer - Courier">Bank Transfer - Courier</option>
                            <option value="COD - Company Delivery">COD - Company Delivery</option>
                        </select>
                    </div>
                    <div class="main-order-form-content-container-Shipping-Date" id="main-order-form-content-container-Shipping-Date">
                        <label class="main-order-form-content" id="main-order-form-content" for="birthday">Date to Drop:</label>
                        <input class="main-order-form-input-Shipping-Date" id="main-order-form-input-Shipping-Date" type="date" name="datetodrop" value=<?php echo'"20'.date("y-m-d").'"' ?> min=<?php echo'"20'.date("y-m-d").'"' ?>></input>
                    </div>
                    <div class="main-order-button-container">
                        <div class="main-order-button-enter-container" id="main-order-button-enter-container">
                            <input class="main-order-button-enter" id="main-order-button-enter" type="submit" value="Confirm"></input>
                        </div>
                    </div>
                </form>
                <div class="main-order-add-container" id="main-order-add-container">
                    <button class="main-order-add" id="main-order-add" onclick="addProject()">Add Project</button>
                </div>
            </section>
        </main>
    </body>
</html>

<?php
    if($_SERVER['REQUEST_METHOD'] === "POST")
    {
        // algorithm runs per Order, 1 OrderID, 1 CustomerID, n ProjectCode that depends on number of projects in an Order.
        
        $project = 1;
        $projectname = $_POST['projectname'.$project];
        $bookquantity = $_POST['bookquantity'.$project];

        // input validation
        while ($projectname !== NULL)
        {
            $flyleaf = false;

            if (empty($projectname) || empty($bookquantity) || !is_numeric($bookquantity))
            {
                echo '<script>document.getElementById("main-order-error-container").style.display = "block";</script>';
                die;
            }
            if ($bookquantity > 9999) 
            {
                echo '<script>document.getElementById("main-order-error-container").style.display = "block";</script>';
                echo '<script>document.getElementById("main-order-error").innerHTML = "Projects are limited to 9999 books!";</script>';
                die;
            }
            $projectname = $_POST['projectname'.$project];
            $bookquantity = $_POST['bookquantity'.$project];
        
            $project++;
        }
        
        $project = 1;
        $totalamount = 0;
        $servicecharge = 0;

        $orderid = orderID($con);
        $customerid = $user_data['CustomerID'];

        // iteration is set per Project
        while (1)
        {
            $flyleaf = false;

            $projectname = $_POST['projectname'.$project];
            $bookquantity = (int)$_POST['bookquantity'.$project];
            $bindingtype = $_POST['bindingtype'.$project];
            $covermaterial = $_POST['covermaterial'.$project];
            if (isset($_POST['flyleaf'.$project])) $flyleaf = true;

            if ($projectname === NULL) 
            {
                header("Location: Profile.php");
		        break;
            }
            
            $projectcode = projectCode($con);

            // data_information insert (CustomerID, OrderID, ProjectCode)
            $query = "insert into data_information (CustomerID,OrderID,ProjectCode) values ('$customerid','$orderid','$projectcode')";
            mysqli_query($con,$query);

            // project_details
            $query = "insert into project_details (ProjectCode,ProjectName,BookQuantity) values ('$projectcode','$projectname','$bookquantity')";
            mysqli_query($con,$query);

            // service charge is per book, pricing depends on company policy
            $servicecharge += $bookquantity * 20;

            // project_materials_information 
            // for binding type
            $query = "select * from material_information where MaterialID = '$bindingtype'";
            $result = mysqli_query($con,$query);
            $material_information = mysqli_fetch_assoc($result);

            $quantity = $bookquantity;
            $amount = $material_information['UnitPrice'] * $quantity;
            $materialid = $material_information['MaterialID'];
            $totalamount += $amount;
            
            $query = "insert into project_materials_information (ProjectCode,MaterialID,Quantity,Amount) values ('$projectcode','$materialid','$quantity','$amount')";
            mysqli_query($con,$query);
            
            // project_materials_information 
            // for cover material
            // to get unit price
            $query = "select * from material_information where MaterialID = '$covermaterial'";
            $result = mysqli_query($con,$query);
            $material_information = mysqli_fetch_assoc($result);

            $quantity = $bookquantity * 2;
            $amount = $material_information['UnitPrice'] * $quantity;
            $materialid = $material_information['MaterialID'];
            $totalamount += $amount;
            
            $query = "insert into project_materials_information (ProjectCode,MaterialID,Quantity,Amount) values ('$projectcode','$materialid','$quantity','$amount')";
            mysqli_query($con,$query);

            // project_materials_information
            // for fly leaf
            if ($flyleaf === true) 
            {
                $amount = 15 * $quantity;
                $query = "insert into project_materials_information (ProjectCode,MaterialID,Quantity,Amount) values ('$projectcode','M00001','$quantity','$amount')";
                mysqli_query($con,$query);
                $totalamount += $amount;
            }

            $project++;
        }

        // order_details
        $orderdate = date("20y-m-d");
        $paymentdelivery = $_POST['paymentdelivery'];
        $shippingdate = date("20y-m-d", strtotime($_POST['datetodrop']));
        $status = 1;

        $query = "insert into order_details (OrderID,OrderDate,ShippingDate,ModeOfPaymentDelivery,Status) values ('$orderid','$orderdate','$shippingdate','$paymentdelivery','$status')";
        mysqli_query($con,$query);

        // data_information update (ServiceCharge, TotalAmount)
        $totalamount += $servicecharge;

        $query = "UPDATE data_information 
                    SET ServiceCharge=$servicecharge, TotalAmount=$totalamount 
                    WHERE OrderID='$orderid'";
        mysqli_query($con,$query);

        die;
    }

    function projectCode($con)
	{
		$query = "select ProjectCode from project_details";

		$result = mysqli_query($con,$query);
		$exist = mysqli_num_rows($result) + 1;
		if ($exist < 10) $number = "0000";
		else if ($exist < 100) $number = "000";
		else if ($exist < 1000) $number = "00";
		else if ($exist < 10000) $number = "0";
		else 
		{
			$projectcode = "PC".$exist;
			return $projectcode;
		}

		$projectcode = "PC".$number.$exist;
		return $projectcode;
	}

    function orderID($con)
	{
		$query = "select OrderID from order_details";

		$result = mysqli_query($con,$query);
		$exist = mysqli_num_rows($result) + 1;
		if ($exist < 10) $number = "0000";
		else if ($exist < 100) $number = "000";
		else if ($exist < 1000) $number = "00";
		else if ($exist < 10000) $number = "0";
		else 
		{
			$orderid = "O".$exist;
			return $orderid;
		}

		$orderid = "O".$number.$exist;
		return $orderid;
	}
?>