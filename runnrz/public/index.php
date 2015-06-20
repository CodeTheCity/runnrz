<?php

use OA\PhalconRest\Mvc\Micro as PhalconRestApp;

error_reporting(E_ALL);

$debug = new \Phalcon\Debug();
$debug->listen();

//try {

    define('APP_PATH', realpath('..') . '/');

    /**
     * Read the configuration
     */
    $config = include __DIR__ . "/../app/config/config.php";

    /**
     * Read auto-loader
     */
    include __DIR__ . "/../app/config/loader.php";

    /**
     * Read services
     */
    include __DIR__ . "/../app/config/services.php";

    /**
     * Handle the request
     */
    $application = new \Phalcon\Mvc\Application($di);

    echo $application->handle()->getContent();

/*} catch (\Exception $e) {
    echo $e->getMessage();
}*/