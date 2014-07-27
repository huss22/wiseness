<?php
require_once('password.php');
$con = mysqli_connect("50.62.209.111","domyreturnadmin","Admin#97&98","TestDB");

// Check connection

if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  ?>