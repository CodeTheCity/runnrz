<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$router = new Phalcon\Mvc\Router(false);

$router->removeExtraSlashes(true);
$router->setDefaultController('index');
$router->setDefaultAction('index');


/**
 * Home page routes
 */

$router->add("/", array(
    'controller' => 'index',
    'action' => 'index',
))->via(array('GET'));

/**
 * Global Route Rules
 */

/*$router->add("/:controller/:params", array(
    'controller' => 1,
    'params' => 2,
))->via(array('GET'));*/

/**
 * Admin login
 */

/*$router->add("/admin/:params", array(
    'controller' => 'admin',
    'action' => 'index',
    'params' => 3,
))->via(array('GET'));*/

/**
 * Password Reset
 */

/*$router->add("/admin/password-reset/:params", array(
    'controller' => 'admin',
    'action' => 'resetPage',
    'params' => 3,
))->via(array('GET'));

$router->add("/api/admin/password/reset/:params", array(
    'controller' => 'admin',
    'action' => 'resetRequest',
    'params' => 3,
))->via(array('POST'));*/

$router->add("/api/1.0/pages/{url}/:params", array(
    'controller' => 'api',
    'action' => 'getPage',
    'params' => 3,
))->via(array('GET'));


$router->add("/api/1.0/token/gen/:params", array(
    'controller' => 'token',
    'action' => 'createToken',
    'params' => 3,
))->via(array('POST'));

$router->add("/api/1.0/token/auth/:params", array(
    'controller' => 'token',
    'action' => 'authorizeRequest',
    'params' => 3,
))->via(array('GET'));

$router->add("/api/1.0/token/auth/:params", array(
    'controller' => 'token',
    'action' => 'authenticateToken',
    'params' => 3,
))->via(array('POST'));



$router->add("/api/1.0/users/create/:params", array(
    'controller' => 'token',
    'action' => 'createUsers',
    'params' => 3,
))->via(array('POST'));

$router->add("/api/1.0/users/login/:params", array(
    'controller' => 'token',
    'action' => 'userLogin',
    'params' => 3,
))->via(array('POST'));
