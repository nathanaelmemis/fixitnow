<?php 
    session_start();

	include("../PHP/Connection.php");
    include("../PHP/Functions.php");

	$user_data = check_login($con);
    if (isset($_SESSION['admin'])) $admin = $_SESSION['admin'];
    if ($user_data == NULL) header("Location: login.php");

    // get user data
    $customerid = $user_data['CustomerID'];

    // check for complete orders
    $query = "SELECT *
            FROM order_details";
    $result = mysqli_query($con,$query);
    if (mysqli_num_rows($result) > 0)
        while($row_check = mysqli_fetch_array($result)) 
        {
            if (strtotime($row_check['ShippingDate']) < strtotime(date("d-m-20y")))
            {
                $orderid_check = $row_check['OrderID'];
                $query = "UPDATE order_details 
                    SET Status=3
                    WHERE OrderID='$orderid_check'";
                mysqli_query($con,$query);
            };
        }
            
        

    if ($admin === 1)
    {
        $query = "SELECT *
                    FROM order_details";
        $result = mysqli_query($con,$query);
        if (mysqli_num_rows($result) > 0)
        {
            while($row = mysqli_fetch_array($result)) $orderid[] = $row['OrderID'];

            $query = "SELECT *
                        FROM order_details";
            $result = mysqli_query($con,$query);
        }
    }
    else
    {   
        $query = "SELECT OrderID
                FROM data_information
                WHERE CustomerID='$customerid'";
        $result = mysqli_query($con,$query);
        if (mysqli_num_rows($result) > 0)
        {
            while($row = mysqli_fetch_array($result)) $orderid[] = $row['OrderID'];
            $orderid = array_unique($orderid);
            sort($orderid);
    
            $query = "SELECT *
                        FROM order_details
                        WHERE OrderID IN ('".implode("','", $orderid)."')";
            $result = mysqli_query($con,$query);
        }
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>7576 Book Binding Services</title>
        <link rel="stylesheet" type="text/css" href="../CSS/Profile.css">
    </head>
    <body>
        <!-- HEADER -->
        <header>
            <div class="header-container" id="header-container">
                <div class="header-left-container">
                    <div class="header-left" id="header-left-hide">
                        <a class="header-left-content" href="Homepage.php#main-products-container">Products</a>
                    </div>
                    <div class="header-left" id="header-left">
                        <a class="header-left-content" id="header-left-content" href="Inquire.php">Inquire</a>
                    </div>
                    <?php
                        if ($admin === 1) echo '<script>document.getElementById("header-left").style.display = "none"</script>';
                    ?>
                    <div class="header-left" id="header-left-hide">
                        <a class="header-left-content" href="Homepage.php#about-us-container">About Us</a>
                    </div>
                </div>
                <div class="header-logo-container" id="header-logo-container">
                    <a href="Homepage.php"><img class="header-logo" src="../assets/HomePage/Header/CompanyLogo.png" alt="Company Logo"></a>
                </div>
                <div class="header-right-container" id="header-right-container">
                    <div class="header-right" id="header-right">
                        <a class="header-right-content" id ="header-right-content" href="..\PHP\Logout.php">Logout</a>
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
            <section class="main-introduction-container">
                <div class="main-introduction-name-container">
                    <p class="main-introduction-name" id="main-introduction-name">Your Orders</p>
                    <?php
                        if ($admin === 1) echo '<script>document.getElementById("main-introduction-name").innerHTML = "All Orders"</script>';
                    ?>
                </div>
                <div class="main-introduction-line-container" id="main-introduction-line-container">
                    <hr class="main-introduction-line">
                </div>
            </section>
            <!-- ORDERS -->
            <section class="main-order-container">
                <div >
                    <div class="main-order-column-name-container-OrderID">
                        <p class="main-order-column-name">OrderID</P>
                    </div>
                    <div class="main-order-column-name-container-Order-Date">
                        <p class="main-order-column-name">Order Date</p>
                    </div>
                    <div class="main-order-column-name-container-Shipping-Date">
                        <p class="main-order-column-name">Shipping Date</p>
                    </div>
                    <div class="main-order-column-name-container-MOPD">
                        <p class="main-order-column-name">Mode of Payment/Delivery</p>
                    </div>
                    <div class="main-order-column-name-container-Status">
                        <p class="main-order-column-name">Status</p>
                    </div>
                    <div class="main-introduction-line-container" id="main-introduction-line-container">
                        <hr class="main-introduction-line">
                    </div>
                </div>
                <?php 
                    if (mysqli_num_rows($result) == 0)
                    {
                        echo '<p class="main-order-empty">You have no order records exisiting!</p>';
                    }
                    else
                    {
                        if ($admin == 1) $href = "AdminProjects.php";
                        else $href = "Projects.php";
                        for ($i = 0; $i < mysqli_num_rows($result); $i++)
                        {
                            $row = mysqli_fetch_array($result);
                            $orderdate[] = $row['OrderDate'];
                            $shippingdate[] = $row['ShippingDate'];
                            $MOPD[] = $row['ModeOfPaymentDelivery'];
                            $status = $row['Status'];
                                
                            if ($admin == 1 && $status == 1) echo '<a class="main-order-tables-container-new" href="'.$href.'?orderid='.$orderid[$i].'">';
                            else echo '<a class="main-order-tables-container" href="'.$href.'?orderid='.$orderid[$i].'">';
                            echo '<div class="main-order-column-name-OrderID">';
                            echo '<p class="main-order-column-name" id="main-order-column-name">'.$orderid[$i].'</p></div>';
                            echo '<div class="main-order-column-name-Order-Date">';
                            echo '<p class="main-order-column-name" id="main-order-column-name">'.date("m-d-20y", strtotime($orderdate[$i])).'</p></div>';
                            echo '<div class="main-order-column-name-Shipping-Date">';
                            if ($status == 1 || $status == 4) echo '<p class="main-order-column-name" id="main-order-column-name">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</p></div>';
                            else echo '<p class="main-order-column-name" id="main-order-column-name">'.date("m-d-20y", strtotime($shippingdate[$i])).'</p></div>';
                            echo '<div class="main-order-column-name-MOPD">';
                            echo '<p class="main-order-column-name" id="main-order-column-name">'.$MOPD[$i].'</p></div>';
                            echo '<div class="main-order-column-name-Status">';
                            switch ($status)
                            {
                                case 1:
                                    echo '<img class="main-order-img" src="../assets/Profile/Main/new.png"></div>';
                                    break;
                                case 2:
                                    echo '<img class="main-order-img" src="../assets/Profile/Main/processing.png"></div>';
                                    break;
                                case 3:
                                    echo '<img class="main-order-img" src="../assets/Profile/Main/completed.png"></div>';
                                    break;
                                case 4:
                                    echo '<img class="main-order-img" src="../assets/Profile/Main/cancelled.png"></div>';
                                    break;
                            }
                            echo '</a>';
                        }
                    }
                ?>
            </section>
        </main>
    </body>
</html>