<?php 
    session_start();

	include("../PHP/Connection.php");
    include("../PHP/Functions.php");

	$user_data = check_login($con);
    if(isset($_SESSION['admin'])) $admin = $_SESSION['admin'];

    if ($user_data == NULL) header("Location: login.php");

    // get user data
    $customerid = $user_data['CustomerID'];
    $orderid = $_GET['orderid'];

    if ($orderid === NULL) header("Location: Profile.php"); 

    // validate orderid
    $query = "SELECT OrderID
            FROM data_information
            WHERE CustomerID='$customerid'";
    $result = mysqli_query($con,$query);

    if (mysqli_num_rows($result) > 0)
    {
        $valid = 0;
        while($row = mysqli_fetch_array($result)) if ($row['OrderID']===$orderid) $valid = 1;
        if ($valid == 0) header("Location: Profile.php");
    }
    else header("Location: Profile.php");
    
    
    // data_information
    $query = "SELECT ProjectCode, ServiceCharge, TotalAmount
                FROM data_information
                WHERE OrderID='$orderid'";
    $result = mysqli_query($con,$query);

    if (mysqli_num_rows($result) > 0)
    {
        $SCTA = mysqli_fetch_assoc($result);
        $servicecharge = $SCTA['ServiceCharge'];
        $totalamount = $SCTA['TotalAmount'];
        $projectcode[] = $SCTA['ProjectCode'];
    }
    
    if (mysqli_num_rows($result) > 0)
    {
        while($row = mysqli_fetch_array($result)) $projectcode[] = $row['ProjectCode'];
        $projectcode = array_unique($projectcode);
        sort($projectcode);

        $query = "SELECT *
                    FROM project_details
                    WHERE ProjectCode IN ('".implode("','", $projectcode)."')";
        $project_details = mysqli_query($con,$query);
    }

    $query = "SELECT *
                FROM order_details
                WHERE OrderID='$orderid' ";
    $result = mysqli_query($con,$query);
    $order_details = mysqli_fetch_assoc($result);
    $status = $order_details['Status'];
    $shippingdate = $order_details['ShippingDate'];
?>

<!DOCTYPE html>
<html>
    <head>
        <title>7576 Book Binding Services</title>
        <link rel="stylesheet" type="text/css" href="../CSS/Projects.css">
    </head>
    <body>
        <!-- HEADER -->
        <header>
            <div class="header-container" id="header-container">
                <div class="header-left-container">
                    <div class="header-left" id="header-left">
                        <a class="header-left-content" id="header-left-content" href="Profile.php">Your Orders</a>
                    </div>
                </div>
                <div class="header-logo-container" id="header-logo-container">
                    <a href="Homepage.php"><img class="header-logo" src="../assets/HomePage/Header/CompanyLogo.png" alt="Company Logo"></a>
                </div>
                <div class="header-right-container" id="header-right-container">
                    <div class="header-right" id="header-right">
                        <a class="header-right-content" id ="header-right-content" href="Logout.php">Logout</a>
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
                    <p class="main-introduction-name" id="main-introduction-name">Order Details</p>
                </div>
                <div class="main-introduction-line-container" id="main-introduction-line-container">
                    <hr class="main-introduction-line">
                </div>
            </section>
            <!-- ORDERS -->
            <section class="main-order-container">
                <div>
                    <div class="main-order-details-container-OrderID">
                        <p>Order ID: <?php echo $orderid ?></P>
                    </div>
                    <?php
                        switch ($status)
                        {
                            case 1:
                                echo '<img class="main-order-img" src="../assets/Profile/Main/new.png">';
                                break;
                            case 2:
                                echo '<img class="main-order-img" src="../assets/Profile/Main/processing.png">';
                                break;
                            case 3:
                                echo '<img class="main-order-img" src="../assets/Profile/Main/completed.png">';
                                break;
                            case 4:
                                echo '<img class="main-order-img" src="../assets/Profile/Main/cancelled.png">';
                                break;
                        }
                    ?>
                    <div class="main-order-details-container-Order-Details-Order-Date">
                        <p>Order Date: <?php echo date("m-d-20y", strtotime($order_details['OrderDate']))?></p>
                    </div>
                    <div class="main-order-details-container-Order-Details">
                        <?php
                            if ($status == 1 || $status == 4) echo '<p>Shipping Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</p></div>';
                            else echo '<p>Shipping Date: '.date("m-d-20y", strtotime($shippingdate)).'</p></div>';
                        ?>
                    </div>
                    <div class="main-order-details-container-Order-Details">
                        <p>Mode of Payment/Delivery: <?php echo $order_details['ModeOfPaymentDelivery']?></p>
                    </div>
                    <div class="main-order-details-container-Order-Details-Service-Charge">
                        <p>Service Charge: <?php echo $servicecharge ?>.00php</p>
                    </div>
                    <div class="main-order-details-container-Order-Details">
                        <p>Total Amount: <?php echo $totalamount ?>.00php</p>
                    </div>
                    <div class="main-order-line-container" id="main-order-line-container">
                        <hr class="main-order-line">
                    </div>
                </div>
                <?php 
                    // projects
                    for ($i = 0; $i < mysqli_num_rows($project_details); $i++)
                    {
                        $row = mysqli_fetch_array($project_details);
                        $projectname[] = $row['ProjectName'];
                        $bookquantity[] = $row['BookQuantity'];
                            
                        echo '
                        <div>
                            <div class="main-projects-Project-Code">
                                <p>Project Code: '.$projectcode[$i].'</p></div>
                            <div class="main-projects-Project-Details">
                                <p>Project Name: '.$projectname[$i].'</p></div>
                            <div class="main-projects-Project-Details">
                                <p>Book Quantity: '.$bookquantity[$i].'</p></div>
                            </div>
                        <div>
                            <div class="main-projects-column-name-Material-ID">
                                <p>Material ID</P>
                            </div>
                            <div class="main-projects-column-name-Material-Name">
                                <p>Material Name</p>
                            </div>
                            <div class="main-projects-column-name-Unit-Price">
                                <p>Unit Price</p>
                            </div>
                            <div class="main-projects-column-name-Quantity">
                                <p>Quantity</p>
                            </div>
                            <div class="main-projects-column-name-Amount">
                                <p>Amount</p>
                            </div>
                        </div>';

                        // project materials
                        $query = "SELECT *
                                    FROM project_materials_information
                                    JOIN material_information ON project_materials_information.MaterialID=material_information.MaterialID
                                    WHERE ProjectCode='$projectcode[$i]'";
                        $result = mysqli_query($con,$query);
                        for ($j = 0; $j < mysqli_num_rows($result); $j++)
                        {
                            $materials_row = mysqli_fetch_array($result);

                            echo '
                            <div>
                                <div class="main-projects-tables-Material-ID">
                                    <p>'.$materials_row['MaterialID'].'</P>
                                </div>
                                <div class="main-projects-tables-Material-Name">
                                    <p>'.$materials_row['MaterialName'].'</p>
                                </div>
                                <div class="main-projects-tables-Unit-Price">
                                    <p>'.$materials_row['UnitPrice'].'.00php</p>
                                </div>
                                <div class="main-projects-tables-Quantity">
                                    <p>'.$materials_row['Quantity'].'</p>
                                </div>
                                <div class="main-projects-tables-Amount">
                                    <p>'.$materials_row['Amount'].'.00php</p>
                                </div>
                            </div>';
                        }

                        if ($i+1 < mysqli_num_rows($project_details)) echo '
                        <div class="main-projects-line-container" id="main-projects-line-container">
                            <hr class="main-projects-line">
                        </div>';
                        else echo '<div style="margin-bottom: 40px;">';
                    }
                ?>
            </section>
        </main>
    </body>
</html>