<!DOCTYPE>
<!--[if lt IE 7 ]> <html class="ie6" id="root" lang="en"> <![endif]-->
<!--[if IE 7 ]> <html class="ie7" id="root" lang="en"> <![endif]-->
<!--[if IE 8 ]> <html class="ie8" id="root" lang="en"> <![endif]-->
<!--[if gt IE 8 ]> <html class="ie9" id="root" lang="en"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html id="root" lang="en"> <!--<![endif]-->
    <head>
        <base href="https://local.runnrz.co.uk/">
        <meta content="local" />
        {{ get_title() }}
        {{ stylesheet_link('css/main.css') }}
        {% include 'layouts/meta.volt' %}            
        {{ assets.outputCss() }}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <link href='https://fonts.googleapis.com/css?family=Noto+Serif:400,400italic,700,700italic|Noto+Sans:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.0.5/es5-shim.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
            <style>
                .ng-hide {
                    display: none !important;
                }
            </style>
        <![endif]-->

        <?php /* <script type="text/javascript" src="/js/libs/browser-detect.js"></script>
        <script type="text/javascript" src="/js/libs/modernizr.min.js"></script>*/ ?>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
        <link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.9/mapbox.css' rel='stylesheet' />

    </head>
    <body id="ng-app" class="bootstrap">
        <div class="container" ng-controller="CoreController">

            {% include 'layouts/header.volt' %}

  		    <div ui-view></div>

        </div>

        <footer class="footer">
            <div class="container">
                <p class="text-muted">Copyright &copy; <?php echo date('Y'); ?> Runnrz</p>
            </div>
        </footer>
        
        {{ javascript_include('js/dist/libs.min.js') }}
        {{ javascript_include('js/dist/all.js') }}

        {{ assets.outputJs() }}


        <?php /*<script>var token = '{{ accessToken }}';</script>*/ ?>

        <?php /* <script type="text/javascript" id="cookiebanner" data-moreinfo="/cookies" data-bg="#183043" src="/js/libs/jquery.cookieBanner.js"></script>*/ ?>
        
        <script> 
            var $buoop = {vs:{i:8,f:15,o:12.1,s:5.1},c:2}; 
            function $buo_f(){ 
             var e = document.createElement("script"); 
             e.src = "//browser-update.org/update.js"; 
             document.body.appendChild(e);
            };
            try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
            catch(e){window.attachEvent("onload", $buo_f)}
        </script> 

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-xxx-xxx', 'auto');
      ga('send', 'pageview');

    </script>
    
    </body>
</html>
