<?php
session_start();
error_reporting(0);

$con=mysqli_connect("localhost","root","","magicnotes");

$uname = trim($_POST['username']);
$email = trim($_POST['email']);
$pass = trim($_POST['password']);

if(!empty($uname) && !empty($email) && !empty($pass)) {
    
    $query="select * from user where email='$email' or username='$uname'";
    $res=mysqli_query($con, $query);

    if(mysqli_num_rows($res) > 0) {
        echo "User already exist...";
    } else {
        $query = "CREATE TABLE ". $uname ."
                (
                id int NOT NULL AUTO_INCREMENT,
                title text,
                content text,
                theme text,
                PRIMARY KEY (id)
                )";

        if (mysqli_query($con, $query) === TRUE) {
            $query="insert into user values ('$uname','$email','$pass')";
            $res=mysqli_query($con, $query);

            echo "Account registered successfully";
        } else {
            echo "";
        }

        $_SESSION["user"] = $uname;  
    }
}
?>

