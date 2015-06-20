<?php

use Phalcon\Mvc\Controller;
use Phalcon\Filter;
use Phalcon\Http\Request;
use Phalcon\DI\InjectionAwareInterface;
use Phalcon\Mvc\Model\Criteria;
use Phalcon\Paginator\Adapter\Model as Paginator;
use OAuth2\Autoloader;
use mikehaertl\wkhtmlto\Pdf;

class ApiController extends TokenController
{

    public $submitData;

    public $siteUrl;

    public $htmlPConfig;

    public $htmlPurifier;

    public $cache;

    public $params;

    public $access_token;

    public function initialize()
    {

        parent::initialize();
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $this->getRequestSetup();
                break;
            case "POST":
                $this->postRequestSetup();
                break;
            case "PUT":
                $this->putRequestSetup();
                break;
            case 'DELETE':
                $this->deleteRequestSetup();
                break;
        }

        $this->params = $this->dispatcher->getParams();

        /*if(empty($this->submitData->render) || !isset($this->submitData->render)){
            $this->view->disable();
        }*/

        /*$ultraFastFrontend = new DataFrontend(array(
            "lifetime" => 3600
        ));

        $fastFrontend = new DataFrontend(array(
            "lifetime" => 14400
        ));

        $slowFrontend = new DataFrontend(array(
            "lifetime" => 86400
        ));

        $this->cache = new Multiple(array(
            new ApcCache($ultraFastFrontend, array(
                "prefix" => 'cache',
            )),
            new MemcacheCache($fastFrontend, array(
                "prefix" => 'cache'
            )),
            new FileCache($slowFrontend, array(
                "prefix" => 'cache',
                "cacheDir" => "/tmp/"
            ))
        ));*/
    }

    private function getRequestSetup()
    {
        if(!empty($_SERVER['X_ACCESS_TOKEN'])){
            $this->access_token = $this->filter->sanitize($_SERVER['X_ACCESS_TOKEN'], "string");
        }
        $this->getParams = $_GET;
    }

    private function deleteRequestSetup()
    {
        if(!empty($_SERVER['X_ACCESS_TOKEN'])){
            $this->access_token = $this->filter->sanitize($_SERVER['X_ACCESS_TOKEN'], "string");
        }
        $this->getParams = $this->filter->sanitize($_GET, "alphanum");
    }

    private function postRequestSetup()
    {
        $request = new Phalcon\Http\Request();

        $this->submitData = json_decode($request->getRawBody(), true);

        if(!empty($_SERVER['X_ACCESS_TOKEN'])){
            $this->submitData['access_token'] = $this->filter->sanitize($_SERVER['X_ACCESS_TOKEN'], "string");
        }

        $this->view->disable();
    }

    private function putRequestSetup()
    {
        $this->submitData = json_decode(file_get_contents("php://input"), true);
    }

    /**
     * Action to register a new user
     */
    public function indexAction()
    {

    }


}
