<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $type = $_POST["type"];
    switch ($type) {
        case "INSERT":
            $value = $_POST["value"];

            $ch = curl_init();
            $url = "http://gavins.me:8086/write?db=";
            $db = $_POST["db"];
            $q = "api_test,author=shao,method=ajax value=" . $value;
            $url_final = $url . $db;
            curl_setopt($ch, CURLOPT_URL, $url_final);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $q);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            $output = curl_exec($ch);
            echo $output;
            curl_close($ch);

            break;

        case "SELECT":
            $db = $_POST["db"];
            $q = $_POST["q"];

// reinitialize curl resource
            $ch = curl_init();
// set url
            $url = "http://gavins.me:8086/query?";
            //directly urlencode("db=mydb") will encode "=", which makes the query invalid.
            $query = "db=" . urlencode($db) . '&' . "q=" . urlencode($q);
            $url_final = $url . $query;
            curl_setopt($ch, CURLOPT_URL, $url_final);
//return result as a string
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

            $output = curl_exec($ch);
            echo $output;

// close curl resource to free up system resources
            curl_close($ch);

            break;

    }
}

//curl -i -XPOST 'db=mydb' --data-binary 'cpu_load_short,host=server01,region=us-west value=0.64 1434055562000000000'