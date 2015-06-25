<?php 
	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	$company = $_POST['company'];
	$phone = $_POST['phone'];
	// $formcontent="From: $name \nEmail: $email \nCompany: $company \nPhone: $phone \nMessage: $message";
	// $recipient = "contactus@claimsbureau.com";
	$recipient = "trand87@gmail.com";
	$subject = "Contact Form Message";
	$mailheader = "From: no-reply@claimsbureau.com\r\n";


	console.log(vars);

		// Scrub inputs for bad characters and replace with ''
		function spam_scrubber($value) {

			$bad_chars = array(
				'to:',
				'cc:',
				'bcc',
				'content-type:',
				'mime-version:',
				'multipart-mixed:',
				'content-tranfer-encoding:');

			foreach($bad_chars as $v) {
				if (stripos($value, $v) !== false) {
					return '';
				}
			}

			$value = str_replace(array("\r", "\n", "%0a", "%0d"), '', $value);

			return trim($value);

		}

		// Call the srub function on form data
		$scrubbed = array_map('spam_scrubber', $_POST);

		// Basic form validation
		if(!empty($scrubbed['$name']) && !empty($scrubbed['$email']) && !empty($scrubbed['$message']) ) {

			$formcontent = "Name: {$scrubbed['$name']}
			\nEmail: {$scrubbed['$email']}  
			\nCompany: {$scrubbed['$company']} 
			\nPhone: {$scrubbed['$phone']}
			\nMessage: {$scrubbed['$message']}"

			console.log('mailed');

			mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
			echo 'Thank You!  Message sent';

			$_POST = array();

		} else {
			echo '<p>Please complete the requied fields.</p>';
		}

	



	
	
?>