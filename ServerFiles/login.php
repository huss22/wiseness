<?
require_once('password.php');
$con = mysqli_connect("50.62.209.111","domyreturnadmin","Admin#97&98","TestDB");

$email = $_POST ['loginname'];
$password = $_POST ['loginpass'];


if ($stmt = mysqli_prepare($con,"SELECT * FROM login WHERE email = ?")) {
    $stmt->bind_param("s", $email);

    /* execute query */
    $stmt->execute();

    /* instead of bind_result: */
    $result = $stmt->get_result();

$row = $result->fetch_assoc() ;

if (empty($row)) { echo 'User not found';
} elseif(password_verify($password, $row['password'])) {

	if ($stmt = mysqli_prepare($con,"SELECT UID FROM login WHERE email = ?")) {
    $stmt->bind_param("s", $email);

    /* execute query */
    $stmt->execute();

    /* instead of bind_result: */
    $result = $stmt->get_result();

    $row = $result->fetch_assoc() ;

	echo $row['UID']; 

	} }
    else { echo 'Incorrect password!'; }
}
mysqli_close($con);
?>