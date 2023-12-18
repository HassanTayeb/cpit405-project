<?php
const DB_HOST = "localhost";
const DB_USER ="root";
const DB_PASSWORD = "";
const DB_DATABASE = "event";

function connect_to_db(){

    try {

        $dsn ='mysql:dbname=event;host=localhost;port=3306;';
        $db = new PDO($dsn, DB_USER, DB_PASSWORD);
        return $db;

        } catch (Exception $e){
                echo $e->getMessage();
    }
}