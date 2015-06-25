<?php 
	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	$company = $_POST['company'];
	$phone = $_POST['phone'];
	$formcontent="From: $name \n Email: $email \n Company: $company \n Phone: $phone \n  Message: $message";
	$recipient = "contactus@claimsbureau.com";
	$subject = "Contact Form Message";
	$mailheader = "From: no-reply@claimsbureau.com \r\n";
	mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
	echo "Thank You!  Message sent.";
?>