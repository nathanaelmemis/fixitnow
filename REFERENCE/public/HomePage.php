<?php 
    session_start();

	include("../PHP/Connection.php");
    include("../PHP/Functions.php");

	$user_data = check_login($con);
    if (isset($_SESSION['admin'])) $admin = $_SESSION['admin'];
    else $admin = 0;
?>

<!DOCTYPE html>
<html>
    <head>
        <title>7576 Book Binding Services</title>
        <link rel="stylesheet" type="text/css" href="../CSS/HomePage.css">
    </head>
    <body>
        <!-- HEADER -->
        <header>
            <div class="header-container" id="header-container">
                <div class="header-left-container">
                    <div class="header-left" id="header-left-hide">
                        <a class="header-left-content" href="#main-products-container">Products</a>
                    </div>
                    <div class="header-left" id="header-left">
                        <a class="header-left-content" id="header-left-content" href="Inquire.php">Inquire</a>
                    </div>
                    <?php
                        if ($admin === 1) echo '<script>document.getElementById("header-left").style.display = "none"</script>';
                    ?>
                    <div class="header-left" id="header-left-hide">
                        <a class="header-left-content" href="#about-us-container">About Us</a>
                    </div>
                </div>
                <div class="header-logo-container" id="header-logo-container">
                    <a href="#top"><img class="header-logo" src="../assets/HomePage/Header/CompanyLogo.png" alt="Company Logo"></a>
                </div>
                <div class="header-right-container" id="header-right-container-nologin">
                    <div class="header-right" id="header-right-nologin">
                        <a class="header-right-content" id ="header-right-content" href="Login.php">Login</a>
                    </div>
                </div>
                <div class="header-right-container-compress" id="header-right-container-compress-false">
                    <div class="header-right" id="header-right">
                        <a class="header-right-content" id="header-right-content-compress" href="Profile.php">Profile</a>
                    </div>
                </div>
                <?php
                    if ($user_data != NULL)
                    {
                        if ($admin === 1) $line = "Welcome, Admin ";
                        else $line = "Welcome, ";
                        $last_name = strtok($user_data['CustomerName'], ",");
                        echo '<script>document.getElementById("header-right-content").innerHTML = "'.$line.$last_name.'";
                        document.getElementById("header-right-nologin").id = "header-right-login";
                        document.getElementById("header-right-container-nologin").id = "header-right-container-login";
                        document.getElementById("header-right-container-compress-false").id = "header-right-container-compress-true";
                        document.getElementById("header-right-content").href = "Profile.php";</script>';
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
            <!-- INTRODUCTION -->
            <section class="main-introduction-container" id="main-introduction-container">
                <div class="main-introduction-name-container">
                    <p class="main-introduction-name" id="main-introduction-name">7576 Book Binding Services</p>
                </div>
                <div class="main-introduction-line-container" id="main-introduction-line-container">
                        <hr class="main-introduction-line">
                    </div>
                <div class="main-introduction-picture-container" id="main-introduction-picture-container">
                    <img class="main-introduction-picture" id="main-introduction-picture" src="../assets/HomePage/Main/Introduction/Picture.png" alt="Introduction Picture" />
                </div>
                <div class="main-introduction-text-container" id="main-introduction-text-container">
                    <p class="main-introduction-text">
                        Welcome to 7576 Book Binding Services!
                        Our company offers variety of book
                        binds, from soft binds to hard binds, you
                        can assure that we have the quality
                        service for you.<br><br>
                        For Inquiries, kindly login and continue
                        with your inquiry.
                    </p>
                </div>
            </section>
            <!-- PRODUCTS -->
            <section class="main-products-container" id="main-products-container">
                <div class="main-products-name-container">
                    <p class="main-products-name" id="main-products-name">Our Products</p>
                </div>
                <!-- PRODUCT 1 -->
                <div class="main-products-inner-container" id="main-products-inner-container">
                    <div class="main-products-line-container" id="main-products-line-container">
                        <hr class="main-products-line">
                    </div>
                    <div class="main-products-title-container" id="main-products-title-container">
                        <p class="main-products-title" id="main-products-title">Sewn Binding</p>
                    </div>
                    <div class="main-products-picture-container" id="main-products-picture-container">
                        <img class="main-products-picture" id="main-products-picture" src="../assets/HomePage/Main/Product1/SewnBinding.png" alt="Introduction Picture">
                    </div>
                    <div class="main-products-text-container" id="main-products-text-container">
                        <p class="main-products-text">
                            When sewing, the printed sheets are connected with thread. 
                            Printed products bound with thread are very durable, 
                            but their production is complex, expensive, and, for example, 
                            used for very high-quality works.
                        </p>
                    </div>
                </div>
                <!-- PRODUCT 2 -->
                <div class="main-products-inner-container" id="main-products-inner-container">
                    <div class="main-products-line-container" id="main-products-line-container">
                        <hr class="main-products-line">
                    </div>
                    <div class="main-products-title-container" id="main-products-title-container">
                        <p class="main-products-title" id="main-products-title">Glue Binding</p>
                    </div>
                    <div class="main-products-picture-container" id="main-products-picture-container">
                        <img class="main-products-picture" id="main-products-picture" src="../assets/HomePage/Main/Product2/GlueBinding.png" alt="Introduction Picture">
                    </div>
                    <div class="main-products-text-container" id="main-products-text-container">
                        <p class="main-products-text">
                            The pages of books or magazines are printed, folded, 
                            folded together and glued with a hot melt glue, EVA (ethylene vinyl acetate).
                            PUR glue can also be used and known to be more stronger than EVA glue.
                        </p>
                    </div>
                </div>
                <!-- PRODUCT 3 -->
                <div class="main-products-inner-container" id="main-products-inner-container">
                    <div class="main-products-line-container" id="main-products-line-container">
                        <hr class="main-products-line">
                    </div>
                    <div class="main-products-title-container" id="main-products-title-container">
                        <p class="main-products-title" id="main-products-title">Staple Binding</p>
                    </div>
                    <div class="main-products-picture-container" id="main-products-picture-container">
                        <img class="main-products-picture" id="main-products-picture" src="../assets/HomePage/Main/Product3/StapleBinding.png" alt="Introduction Picture">
                    </div>
                    <div class="main-products-text-container" id="main-products-text-container">
                        <p class="main-products-text">
                            Staple binding is a popular binding method in which papers are 
                            arranged on top of each other and stapled together at the fold crease. 
                            It is perfect for documents with small quantity of pages.
                        </p>
                    </div>
                </div>
            </section>
            <!-- ABOUT US -->
            <section class="about-us-container" id="about-us-container">
                <div class="about-us-name-container">
                    <p class="about-us-name" id="about-us-name">About Us</p>
                </div>
                <div class="about-us-line-container" id="about-us-line-container">
                    <hr class="about-us-line">
                </div>
                <div class="about-us-text-container" id="about-us-text-container">
                    <p class="about-us-text" id="about-us-text">
                        7576 Book Binding Services was founded in the year 2013 as a bookbinding service 
                        that primarily serves publishing companies in bulk orders.
                        The name 7576 was inspired from the birthyear of a married couple who are its founder. 
                        To this day, the company still is a growing business that continues to
                        serve people with an honest and high-quality work.
                    </p>
                </div>
            </section>
        </main>
    </body>
</html>