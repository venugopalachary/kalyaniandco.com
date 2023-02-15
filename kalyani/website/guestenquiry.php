<?php  

ini_set ('display_errors', 1);  
ini_set ('display_startup_errors', 1);  
error_reporting (E_ALL);  
  date_default_timezone_set("Asia/Kolkata"); 
  

 $name=$_POST["name"];
 $mobilenumber=$_POST["mobilenumber"];
  $options=$_POST["options"];
  $email="venugopalachary7396@gmail.com";
   
  // echo $name;
   
  // echo $mobilenumber;

 $datetime=date("Y-m-d h:i:s");
 
 


$from    ="venugopalachary7396@gmail.com";
$headers = "From: $from";



 
 if(isset($_POST["mobilenumber"]))  
 {  
        $toEmail = 'Mathitanuja22@gmail.com,venugopalachary7396@gmail.com';
        $emailSubject = 'New email from your contant form';
       // $headers = ['From' => $email, 'Reply-To' => $email, 'Content-type' => 'text/html; charset=iso-8859-1'];

        $bodyParagraphs = [ "Name:" ,$name, "mobilenumber:", $mobilenumber, "options:", $options];
        $body = join(PHP_EOL, $bodyParagraphs);

        if (mail($toEmail, $emailSubject, $body, $headers)) {
            //header('Location: thank-you.html');
            echo 200;
        } else {
            $errorMessage = 'Oops, something went wrong. Please try again later';
        }
      
 }  
  
 ?>