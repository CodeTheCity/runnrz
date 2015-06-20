<?php

use Phalcon\Mvc\Controller;
use Phalcon\Filter;
use Phalcon\Http\Request;
use Phalcon\DI\InjectionAwareInterface;
use Phalcon\Mvc\Model\Criteria;
use Phalcon\Paginator\Adapter\Model as Paginator;
use OAuth2\Autoloader;
use OAuth2\Response;
use OAuth2\TokenType\Bearer;
use OAuth2\Scope;

class TokenController extends Controller
{

    public $test;

    public $storage;

    public $server;

    public function initialize()
    {

    	$this->view->disable();

        OAuth2\Autoloader::register();

        $this->storage = new OAuth2\Storage\Pdo(array('dsn' => 'mysql:dbname=runnrz;host=localhost', 'username' => 'root', 'password' => 'callum'));

        // Pass a storage object or array of storage objects to the OAuth2 server class
        $this->server = new OAuth2\Server($this->storage);

        $defaultScope = 'read';
        $supportedScopes = array(
          'read',
          'write'
        );
        $memory = new OAuth2\Storage\Memory(array(
          'default_scope' => $defaultScope,
          'supported_scopes' => $supportedScopes
        ));
        $scopeUtil = new OAuth2\Scope($memory);

        $this->server->setScopeUtil($scopeUtil);

        // Add the "Client Credentials" grant type (it is the simplest of the grant types)
        $this->server->addGrantType(new OAuth2\GrantType\ClientCredentials($this->storage));

        // Add the "User Credentials" grant type
        $this->server->addGrantType(new OAuth2\GrantType\UserCredentials($this->storage));

        // Add the "Authorization Code" grant type (this is where the oauth magic happens)
        $this->server->addGrantType(new OAuth2\GrantType\AuthorizationCode($this->storage));

        // Add the "Refresh Token" grant type
        $this->server->addGrantType(new OAuth2\GrantType\RefreshToken($this->storage, array('always_issue_new_refresh_token' => true)));

    }

    public function createTokenAction()
    {
        $this->server->handleTokenRequest(OAuth2\Request::createFromGlobals())->send();
    }

    public function authorizeRequestAction()
    {
        $request = OAuth2\Request::createFromGlobals();
        $response = new OAuth2\Response();

        if(!$this->server->validateAuthorizeRequest($request, $response)){
            ob_start();$this->server->getResponse()->send();$error = json_decode(ob_get_contents());ob_end_clean();
            echo json_encode(array('status' => 'error', 'message' => $error->error_description));
        }else{
            $req = $this->server->handleAuthorizeRequest($request, $response, true);
            echo json_encode(array('status' => 'success', 'token' => $response->getHttpHeader('Location')));
        }

    }

    public function authenticateTokenAction()
    {
        $request = OAuth2\Request::createFromGlobals();
        $response = new OAuth2\Response();

    	if (!$this->server->verifyResourceRequest($request, $response)) {
            ob_start();$this->server->getResponse()->send();$error = json_decode(ob_get_contents());ob_end_clean();
            echo json_encode(array('status' => 'error', 'message' => $error->error_description));	    
            die();
		}
		echo json_encode(array('status' => 'success'));
    }

    public function apiPreCheckAction($params=null, $scope=null)
    {
        $request = OAuth2\Request::createFromGlobals();
        $response = new OAuth2\Response();

        if($scope){
            $aTData = $this->server->getAccessTokenData($request, $response);
            $request->query['scope'] = $aTData['scope'];
        }else{
            $request->query['scope'] = 'read';
        }

        if (!$this->server->verifyResourceRequest($request, $response, $scope)) {
            ob_start();$this->server->getResponse()->send();$error = json_decode(ob_get_contents());ob_end_clean();
            return json_encode(array('status' => 'error', 'message' => $error->error_description));
        }else{
            return json_encode(array('status' =>'success'));
        }
    }

    public function createUsersAction()
    {
    	//$this->createUsers();
    	$this->server->handleTokenRequest(OAuth2\Request::createFromGlobals())->send();
    }

    public function userLoginAction()
    {
        $server = new OAuth2\Server($this->storage);
        $server->addGrantType(new OAuth2\GrantType\UserCredentials($this->storage));

        $request = OAuth2\Request::createFromGlobals();
        $response = new OAuth2\Response();

        $this->server->handleTokenRequest($request, $response)->send();

        //$request->query['scope'] = $aTData['scope'];

        /*if (!$server->verifyResourceRequest($request, $response)) {
            ob_start();$this->server->getResponse()->send();$error = json_decode(ob_get_contents());ob_end_clean();
            echo json_encode(array('status' => 'error', 'message' => $error->error_description));
        }
        echo json_encode(array('status' => 'success'));*/
    }

    public function createUsers()
    {
        //$user = array('username' => 'bshaffer', 'password' => 'brent123', 'first_name' => 'Brent', 'last_name' => 'Shaffer');

        $this->storage->setUser('bshaffer', 'brent123', 'Brent', 'Shaffer');

        // create the grant type
        $this->server->addGrantType(new OAuth2\GrantType\UserCredentials($this->storage));
    }
}

