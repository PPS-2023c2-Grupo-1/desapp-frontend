<?php
	
	// ACA ESTAN LOS DATOS QUE SE SACARON DE PRODUCCION
	session_start();
	error_reporting(E_ALL ^ E_DEPRECATED);
	//ini_set( 'display_errors', true );
	//define( 'DB_USERNAME', 'wca627218_pde' );
	//define( 'DB_PASSWORD', '2023_unahur_2023' );
	//define( 'DB_HOST', '192.168.187.78' );
	//define( 'DB_NAME', 'wca627218_pde' );


	ini_set( 'display_errors', true );
	define( 'DB_USERNAME', 'wca62414_user' );
	define( 'DB_PASSWORD', 'pde2021fadu' );
	define( 'DB_HOST', '192.168.186.175' );
	define( 'DB_NAME', 'wca62414_db3' );
	
	define( 'WEB_URL', 'http://wca627219.wcaup.com/unahur/' );
	define( 'WEB_PATH', realpath($_SERVER['DOCUMENT_ROOT']).'/unahur/' );
	define( 'WEB_PATH_HTML','/unahur/' );
	
	include WEB_PATH.'constants.php';
	include WEB_PATH.'functions.php';
	include CLASSES_PATH.'All.php';
	include WEB_PATH.'variables.php';
	include SDK_PATH.'mailer/PHPMailerAutoload.php';
	
	define( 'CONTACT_EMAIL','mifadu@catedrarondina.com.ar' );
	define( 'NO_REPLY_EMAIL','mifadu@catedrarondina.com.ar' );
	define( 'NO_REPLY_NAME','mifadu@catedrarondina.com.ar' );
	define( 'SMAIL_SMTP',true );
	define( 'SMAIL_HOST','smtp.catedrarondina.com.ar' );
	define( 'SMAIL_PORT',25 );
	define( 'SMAIL_AUTH',true );
	define( 'SMAIL_USERNAME','mifadu@catedrarondina.com.ar' );
	define( 'SMAIL_PASSWORD','2020mifadu' );
	define( 'SMAIL_DEBUG',0 );
	
	define( 'CLAVE_MAESTRA','mifadu' );
?>