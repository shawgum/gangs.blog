<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $type = $_POST["type"];
    echo $type;
}
//if ($_SERVER["REQUEST_METHOD"] == "POST") {
//    $type = $_POST["type"];
//    if ($type === "INSERT") {
//        $value = $_POST["value"];
//        $ch = curl_init("http://localhost:8086/write?db=mydb");
//        curl_setopt($ch, CURLOPT_POST, 1);
//        curl_setopt($ch, CURLOPT_POSTFIELDS, "api_test,author=shao,method=ajax value=" . $value);
//        curl_exec($ch);
//        curl_close($ch);
//    } else {
//        $ch = curl_init("http://localhost:8086/query?pretty=true&db=mydb&q=SELECT * FROM \"api_text\"");
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//        $resp = curl_exec($ch);
//        echo $resp;
//        curl_close($ch);
//    }
//}
//curl -G 'http://localhost:8086/query?pretty=true' --data-urlencode "db=mydb" --data-urlencode "q=SELECT \"value\" FROM \"cpu_load_short\" WHERE \"region\"='us-west'"

//curl -i -XPOST 'http://localhost:8086/write?db=mydb' --data-binary 'cpu_load_short,host=server01,region=us-west value=0.64 1434055562000000000'