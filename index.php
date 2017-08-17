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
    <!--    <script src="resources/scripts/jquery-3.2.1.min.js"></script>-->
    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script>
    <script src="resources/scripts/global.js"></script>
    <script src="resources/scripts/util.js"></script>
</head>
<body>
<div id="container">
    <div id="header_container"></div>
    <div id="content_container">
        <article>
            <h1>Research on InfluxDB</h1>
            <section>
                <h2>Ajax Test for InfluxDB</h2>
                <p>The random item will be in mydb.</p>
                <div class="code-panel">
                    <code class="code-content">INSERT api_test,author=shao,method=ajax value=&lt;RANDOM&gt;</code>
                </div>

                <div id="ajaxSent_container">
                    <button onclick="addToInflux('RANDOM')">Add random item</button>
                    <button onclick="clearTable('#ajaxSent')">Clear table</button>
                    <table id="ajaxSent">
                        <caption></caption>
                        <tr class="header">
                            <th>value</th>
                        </tr>
                    </table>
                </div>
                <div id="ajaxResp_container">
                    <button onclick="readFromInflux()">Select all</button>
                    <button onclick="clearTable('#ajaxResp')">Clear table</button>
                    <button onclick="deleteSchema('#ajaxResp')">Delete schema</button>
                    <table id="ajaxResp">
                        <caption></caption>
                        <tbody>
                        <tr class="header">
                        <th>time</th>
                        <th>author</th>
                        <th>method</th>
                        <th>value</th>
                    </tr>
                        </tbody>
                </table>
                </div>
            </section>
            <section>
                <h2>Environment</h2>
                <p>Hyper-V is a feature since Windows 8 Professional/Educational/Enterprise for hosting virtual
                    machines, although possibly could be installed on Windows 7 (see <a
                            href="https://blogs.technet.microsoft.com/schadinio/2010/07/09/installing-hyper-v-manager-on-windows-7/">here</a>).
                </p>
                <h3>Enable Hyper-V using powershell</h3>
                <ol>
                    <li>Open a PowerShell console as Administrator.</li>
                    <li>Run the following command:
                        <div class="code-panel line-numbers">
                                <code class="code-content">Enable-WindowsOptionalFeature -Online
                                    -FeatureName:Microsoft-Hyper-V -All</code>
                        </div>
                    </li>

                </ol>
                <a href="https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v"
                   class="ref">Microsoft Hyper-V</a>
                <pre class="para"><?php echo $environment ?></pre>
                <a class="ref" href="https://portal.influxdata.com/downloads">REF</a>
            </section>
            <section>
                <h2>Install</h2>
                <p><?php echo $install_content ?></p>
                <div class="code-panel line-numbers">
                    <p class="code-heading"><?php echo $install_code_title ?></p>
                        <code class="code-content"><?php echo $install_code ?></code>
                    <a class="ref" href="https://portal.influxdata.com/downloads">REF</a>
                </div>

            </section>
            <h3>h3.1</h3>
            <h4>h4.1</h4>
            <h4>h4.2</h4>
            <h2>h2.1</h2>
            <h3>h3.2</h3>
            <h4>h4.3</h4>
            <div id="article_end"></div>
        </article>
        <div id="heading">
        </div>
        <div id="des">
        </div>
    </div>
    <div id="outline_container">
        <div id="outline">
            <h1>Outline</h1>
            <ul id="outline_ul">

            </ul>
        </div>
    </div>
    <div id="related_link_container">&nbsp;</div>
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
