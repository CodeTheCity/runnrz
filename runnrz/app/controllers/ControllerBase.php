<?php

use Phalcon\Mvc\Controller;

class ControllerBase extends Controller
{

	protected function initialize()
    {

    	ini_set('display_errors',1);
    	error_reporting(E_ALL);

    	$this->siteUrl = $this->publicURL; 

    	$this->tag->setTitle('Runnrz | ');
    	$this->view->setTemplateAfter('index');
    }

}
