<?php

$host = 'http://canon.style.rbc.ru/';
$title = 'Портреты Флоренции: город и его жители';
$description = 'Жители Флоренции рассказали, чем они занимаются и за что любят свой город';
$image = "/images/share/main.jpg";
$imageWidth = 968;
$imageHeight = 504;
$redirect = '/';

switch (@$_GET['hero']) {
	case '1':
		$image = "/images/share/jovanni.jpg";
		$redirect = '/#hero1';
		break;

	case '2':
		$image = "/images/share/daniela.jpg";
		$redirect = '/#hero2';
		break;

	case '3':
		$image = "/images/share/massimiliano.jpg";
		$redirect = '/#hero3';
		break;

	case '4':
		$image = "/images/share/simone.jpg";
		$redirect = '/#hero4';
		break;

	case '5':
		$image = "/images/share/emmanuel.jpg";
		$redirect = '/#hero5';
		break;
}

?>

<!doctype html>
<html lang="ru">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width">
	<meta name="description" content="<?= htmlspecialchars($description) ?>">
	<meta property="og:type" content="website">
	<meta property="og:title" content="<?= htmlspecialchars($title) ?>">
	<meta property="og:description" content="<?= htmlspecialchars($description) ?>">
	<meta property="og:image" content="<?= htmlspecialchars($image ? $host . $image : '') ?>">
	<meta property="og:image:type" content="image/jpeg">
	<meta property="og:image:width" content="<?= htmlspecialchars($imageWidth) ?>">
	<meta property="og:image:height" content="<?= htmlspecialchars($imageHeight) ?>">
	<meta property="og:locale" content="ru_RU">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="<?= htmlspecialchars($title) ?>">
	<meta name="twitter:description" content="<?= htmlspecialchars($description) ?>">
	<title><?= $title ?></title>
</head>
<body onload="window.location = '<?= $redirect ?>'"></body>
</html>