<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $type = $_POST["type"];
    switch ($type) {
        case "INSERT":
            insert();
            break;

        case "SELECT":
            select();
            break;

        case "DROP":
            drop();
            break;
    }
}

function insert()
{
    $value = $_POST["value"];
    $db = $_POST["db"];

    $ch = curl_init();
    $url = "http://gavins.me:8086/write?db=";

    $q = "api_test,author=shao,method=ajax value=" . $value;
    $url_final = $url . $db;
    curl_setopt($ch, CURLOPT_URL, $url_final);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_USERPWD, "shao:shaospassword");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $q);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($ch);
    echo $value;
    curl_close($ch);
}

function select()
{
    $db = $_POST["db"];
    $q = "SELECT * FROM \"api_test\"" . $_POST["q"];

// reinitialize curl resource
    $ch = curl_init();
// set url
    $url = "http://gavins.me:8086/query?";
    //directly urlencode("db=mydb") will encode "=", which makes the query invalid.
    $query = "db=" . urlencode($db) . '&' . "q=" . urlencode($q);
    $url_final = $url . $query;
    curl_setopt($ch, CURLOPT_URL, $url_final);
    curl_setopt($ch, CURLOPT_USERPWD, "shao:shaospassword");
//return result as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $output = curl_exec($ch);
    echo $output;

// close curl resource to free up system resources
    curl_close($ch);
}

function drop()
{
    $db = $_POST["db"];
    $q = "DELETE FROM \"api_test\" WHERE author='shao'";

    $ch = curl_init();
    $url = "http://gavins.me:8086/query?";
    $query = "db=" . urlencode($db) . '&' . "q=" . urlencode($q);
    $url_final = $url . $query;
    curl_setopt($ch, CURLOPT_URL, $url_final);
    curl_setopt($ch, CURLOPT_USERPWD, "shao:shaospassword");
//return result as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $output = curl_exec($ch);
    echo $output;
// close curl resource to free up system resources
    curl_close($ch);

}