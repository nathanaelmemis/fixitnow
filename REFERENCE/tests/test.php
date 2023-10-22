<!DOCTYPE html>
<html>
    <h1>This is a test website!<br><br></h1>

</html>

<?php
    include("../PHP/Connection.php");

    $customerid = "C00001";

    $query = "SELECT OrderID
                FROM data_information
                WHERE CustomerID='$customerid'";
    $result = mysqli_query($con,$query);
    while($row = mysqli_fetch_array($result)) $orderid[] = $row['OrderID'];
    $orderid = array_unique($orderid);
    sort($orderid);

    $query = "SELECT *, COUNT(*) AS orders_n
                FROM order_details
                WHERE OrderID IN ('".implode("','", $orderid)."')";
    $result = mysqli_query($con,$query);
    while($row = mysqli_fetch_array($result)) $order_details[] = $row['OrderID'];

    print($orderid[1]);
?>