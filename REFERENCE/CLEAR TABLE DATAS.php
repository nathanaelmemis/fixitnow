<?php
    include("PHP/Connection.php");

    $query = "TRUNCATE TABLE data_information";
    mysqli_query($con,$query);

    $query = "TRUNCATE TABLE order_details";
    mysqli_query($con,$query);

    $query = "TRUNCATE TABLE project_details";
    mysqli_query($con,$query);

    $query = "TRUNCATE TABLE project_materials_information";
    mysqli_query($con,$query);

    echo "<script>window.close();</script>";
?>

<html>
    <h1 style="text-align: center;">Database Cleared!</h1>
</html>