<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
	</head>
	<body>
    <form action="/xss.php" method="GET">
      <label>
        Search
        <input type="text" name="q" id="search">  
      </label>
    </form>

    <?php
    if(isset($_GET["q"])){
    ?>
    <h1>
      You have searched for: <?= $_GET['q'] ?>
    </h1> 
    <?php  
    }
    ?>
	</body>
</html>