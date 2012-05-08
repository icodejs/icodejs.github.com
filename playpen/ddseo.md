---
layout: page
title: "Datadial Analytics"
subTitle: "Web application that uses the Google Analytics API to automate client reporting"
pageId: "setup"
---
{% include JB/setup %}

## Uses the Google Analytics API to automate client reporting

<div>
    <p>The screenshots below show some of the reports created by a tool I built called Datadial Analytics.</p>

    <p>This analytics tool pulls data from the Google Analytics accounts of Datadial’s SEO clients and
        creates an array of automated reports displaying things like, Monthly traffic, Visit comparisons,
        Top selling products, Monthly revenue, Top keywords and many more.</p>

    <p>This web app was built completely by me, except for the CMS. </p>

    <p>Building this Analytics tool required the following tasks /skills:</p>

    <ul>
        <li>Integration with the Google Analytics API </li>
        <li>Creation of the relational database that stores all the application data</li>
        <li>Domain and data access logic that drives the business layer</li>
        <li>Design skill and the ability to structure the UI using HTML and CSS</li>
        <li>Integration with Google charts and Highcharts Javascript libraries</li>
        <li>Behavioural layer that facilitates user interaction using JavaScript, JQuery and Ajax</li>
    </ul>
</div>
<br />

<style type="text/css">
    #ddseoCarousel {
        width:640px;
        }
    .item img {
        width:640px;
        height:538px;
        }
    .carousel-control {
        top: 47%;
        }
</style>

<div id="ddseoCarousel" class="carousel slide">
    <div class="carousel-inner">
      <div class="item active">
        <img width="640" height="538" src="/img/ddseo/home-brw.png" alt="">
        <div class="carousel-caption">
          <h4>Home page</h4>
          <p>Choose the client you are interested in. Each mini graph shows a snapshot of the site visits over the last sixty days.</p>
        </div>
      </div>
      <div class="item">
        <img src="/img/ddseo/report-details-brw.png" alt="">
        <div class="carousel-caption">
          <h4>Report edit screen</h4>
          <p>Within this section users can choose the reports they would like to add. Once added, reports can be customised based on date range, title, annotation and sort order.</p>
        </div>
      </div>
      <div class="item">
        <img src="/img/ddseo/loading-brw.png" alt="">
        <div class="carousel-caption">
          <h4>Viewing screen (Loading)</h4>
          <p>Reports are loaded in batches of six using Ajax. This is capped at six due to the limited amount of concurrent HTTP requests imposed by most modern browsers.</p>
        </div>
      </div>
      <div class="item">
        <img src="/img/ddseo/revenue-graph-brw.png" alt="">
        <div class="carousel-caption">
          <h4>Visit graph / Yearly traffic comparison</h4>
          <p>Comparison of the visits between September - February 2011/2012 and September - February 2010/2011. Comparison of various metric to the previous year.</p>
        </div>
      </div>
      <div class="item">
        <img src="/img/ddseo/revenue-graph2-brw.png" alt="">
        <div class="carousel-caption">
          <h4>Revenue</h4>
          <p>Revenue break down by month and by source.</p>
        </div>
      </div>
      <div class="item">
        <img src="/img/ddseo/traffic-graph-brw.png" alt="">
        <div class="carousel-caption">
          <h4>Monthly traffic</h4>
          <p>Monthly traffic and a demonstration of the ability to annotate each graph / table.</p>
        </div>
      </div>
      <div class="item">
        <img src="/img/ddseo/visit-graph2-brw.png" alt="">
        <div class="carousel-caption">
          <h4>Traffic sources</h4>
          <p>Comparison of visits year to year and also based on the source of the sites traffic. (Total traffic, PPC, Organic, Direct and Referrals.)</p>
        </div>
      </div>
    </div>
    <a class="left carousel-control" href="#ddseoCarousel" data-slide="prev">‹</a>
    <a class="right carousel-control" href="#ddseoCarousel" data-slide="next">›</a>
</div>

<p>The Datadial Analytics tools is an ongoing project that is constantly being tweaked and updated, based on the needs of the users and new skills that I have learnt.</p>
