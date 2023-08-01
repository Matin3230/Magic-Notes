<?php
session_start();
error_reporting(0);

$email = $_POST['email'];
$pass = $_POST['password'];
    
if(!empty($email) && !empty($pass)) {
    
    $con = mysqli_connect("localhost","root","","magicnotes");
    $query = "select * from user where email='$email' and password='$pass' limit 1";
    $res = mysqli_query($con,$query);

    if(mysqli_num_rows($res) > 0) {
        
        echo "Login done successfully";
        $data = mysqli_fetch_assoc($res);
        $username = $data['username'];
        $_SESSION["user"] = $username;
    } else {
        echo "";
    }
}


