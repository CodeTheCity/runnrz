<?php

$loader = new \Phalcon\Loader();

error_reporting(E_ALL);
ini_set('display_errors', 1);

/**
 * We're a registering a set of directories taken from the configuration file
 */
//include_once($config->application->libraryDir);
//die();


$loader->registerDirs(
    array(
        $config->application->controllersDir,
        $config->application->pluginsDir,
        $config->application->modelsDir,
        $config->application->libraryDir,
        $config->application->formsDir,
    )
)->register();



$loader->registerNamespaces(array(
    'AB' => $config->application->libraryDir
));

$loader->register();

require_once APP_PATH . '../vendor/autoload.php';