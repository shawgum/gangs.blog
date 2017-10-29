<?php
include("resources/texts/index.php");
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
    <a href="sudoku.html">Sudoku Game!</a>
    <div id="header_container"></div>
    <div id="content_container">
        <article>
            <h1>Research on InfluxDB</h1>
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
                <h2>Environment</h2>
            <div class="code-panel">
                <p class="code-heading">Environment</p>
                <code class="code-content">Ubuntu 17.04 x64
                    VMware Workstation Player
                    PHP 7.0
                </code>
            </div>
            <h3>Using Hyper-V (failed because CPU fails to support Hyper-V)</h3>

            <p>Hyper-V is a feature since Windows 8 Professional/Educational/Enterprise for hosting virtual
                    machines, although possibly could be installed on Windows 7 (see <a
                            href="https://blogs.technet.microsoft.com/schadinio/2010/07/09/installing-hyper-v-manager-on-windows-7/">here</a>).
                </p>
            <h4>Enable Hyper-V using powershell</h4>
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
            <p>You need to restart to let the installation finish.</p>
            <h4>Install OS</h4>
            <p>Dowload <a href="https://www.ubuntu.com/download/server">Ubuntu Server</a> OS as an .iso file. (Here I
                use version 17.04 x64)</p>
            <p>Open Hyper-V Manager.</p>
            <img src="resources/images/hyper-v_tutorial.jpg" alt="Hyper-V OS installation steps"/>
            <p>Follow steps in the picture to install and connect.</p>
            <a class="ref"
               href="https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/quick-create-virtual-machine">REF</a>
            <p><b>My computer failed this process because the CPU does not support SLAT.</b></p>
            <h3>Using VMware Workstation Player (the non-commercial version)</h3>
            <h4>Dowload VMware Workstation Player.</h4>
            <a class="ref" href="https://www.vmware.com/products/player/playerpro-evaluation.html">REF</a>
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
            <ul id="outline_ul"></ul>
        </div>
    </div>
    <div id="related_link_container">&nbsp;</div>
    <?php include('resources/texts/footer.php'); ?>
</div>

</body>
</html>
