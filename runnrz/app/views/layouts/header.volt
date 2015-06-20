
		<nav class="navbar navbar-default navbar-inverse navbar-fixed-top">
		    <div class="container-fluid">
		        <div class="navbar-header">
		            <button ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		                <span class="sr-only">Toggle navigation</span>
		                <span class="icon-bar"></span>
		                <span class="icon-bar"></span>
		                <span class="icon-bar"></span>
		            </button>
		            <a class="navbar-brand" href="/"><span>Runnrz</span></a>
		        </div>

		        <div collapse="navCollapsed" class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

					<ul class="nav navbar-nav navbar-right">

						<li data-ng-if="!header.adminAccess"><a href="#about">About</a></li>

		            	<li data-ng-if="!header.adminAccess"><a href="#contact">Contact</a></li>

						<li data-ng-if="!header.adminAccess"><a href="/register">Register</a></li>

		           		<li data-ng-if="!header.adminAccess"><a href="/login">Login</a></li>
		           		
		                <li data-ng-if="header.adminAccess"><a href="/logout">Logout</a></li>
			        </ul>
		        </div>
		    </div>
		</nav>