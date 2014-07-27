<?
require_once('password.php');
$con = mysqli_connect("50.62.209.111","domyreturnadmin","Admin#97&98","TestDB");

$email = $_POST ['registername'];
$password = $_POST ['registerpass'];
$UID = mt_rand();

if ($stmt = mysqli_prepare($con,"SELECT UID FROM login WHERE UID = ?")) {
    $stmt->bind_param("s", $UID);

    /* execute query */
    $stmt->execute();

    /* instead of bind_result: */
    $result = $stmt->get_result();

$row = $result->fetch_assoc() ;
if (empty($row)) { 

if ($stmt = mysqli_prepare($con,"SELECT * FROM login WHERE email = ?")) {
    $stmt->bind_param("s", $email);

    /* execute query */
    $stmt->execute();

    /* instead of bind_result: */
    $result = $stmt->get_result();

$row = $result->fetch_assoc() ;

if (empty($row)) {
if ($stmt = mysqli_prepare($con,"INSERT INTO login (email,password,UID) VALUES (?,?,?)")) {
    $password = password_hash($password, PASSWORD_BCRYPT);
    $stmt->bind_param("sss", $email,$password,$UID);

    /* execute query */
    $stmt->execute();

    echo $UID; 
}
}
else { echo 'User Already Registered, please login';}
}
}
else { echo 'Couldn\'t register user, please try again';}
}
mysqli_close($con);
?>