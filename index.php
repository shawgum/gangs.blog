<?php
include("resources/texts/index.php");
include("resources/texts/footer.php");
include("resources/texts/research_on_influxdb.php");
?>
<!DOCTYPE html>
<html>
<head>
    <title>Gavin's Blog</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link href="https://fonts.googleapis.com/css?family=Zilla+Slab:400,600" rel="stylesheet">
    <link rel="stylesheet" href="resources/stylesheets/typography.css" type="text/css"/>
    <link rel="stylesheet" href="resources/stylesheets/layout.css" type="text/css"/>
    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script>
    <script src="resources/scripts/global.js"></script>
</head>
<body>
<div id="container">
    <div id="header_container"></div>
    <div id="content_container">
        <article>
            <h1>Research on InfluxDB</h1>
            <section aria-label="Environment">
                <h3>Environment</h3>
                <pre class="para"><?php echo $environment ?></pre>
            </section>
            <section>
                <h3>Install</h3>
                <p><?php echo $install_content ?></p>
                <div class="code-panel line-numbers">
                    <p class="code-heading"><?php echo $install_code_title ?></p>
                    <div class="code">
                        <code class="code-content"><?php echo $install_code ?></code>
                    </div>
                    <a class="ref" href="https://portal.influxdata.com/downloads">REF</a>
                </div>

            </section>
        </article>
        <div id="heading">
            <pre><?php echo $heading ?></pre>
        </div>
        <div id="des">
            <pre><?php echo $des ?></pre>
        </div>
    </div>
    <div id="outline_container">
        <div id="outline"></div>
    </div>
    <div id="footer_container">
        <div id="footer">
            <a id="copyright"><?php echo $copyright ?></a>
            <span id="contact" style="display: none">
                <a id="website" href="http://www.gavins.me"><?php echo $website ?></a>
                <a id="email" href="mailto:fexact@outlook.com"><?php echo $email ?></a>
                <a id="github" href="https://github.com/shawgum"><?php echo $github ?></a>
            </span>
        </div>
    </div>
</div>

</body>
</html>
