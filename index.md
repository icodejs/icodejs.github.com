---
layout: home
title: Welcome to {icodejs}
subTitle: "A place to share thoughts & ideas on Javascript, HTML & CSS."
pageId: "home"
---
{% include JB/setup %}

## Usefull links

[Introduction to Pages](http://pages.github.com/)

[Jekyll Quick Start](http://jekyllbootstrap.com/usage/jekyll-quick-start.html)

[Jekyll Introduction](http://jekyllbootstrap.com/lessons/jekyll-introduction.html)

[Install Jekyll](https://github.com/mojombo/jekyll/wiki/Install)

[Pygments Syntax highlighting](http://pygments.org/)

[Jekyll Git home](https://github.com/mojombo/jekyll/)

[icodejs git pages site](https://github.com/icodejs/icodejs.github.com)

[Added option to specify a custom date when creating post](https://github.com/plusjade/jekyll-bootstrap/pull/37)

[The Ultimate Guide To Getting Started With Jekyll: Part 2](http://danielmcgraw.com/2011/04/18/The-Ultimate-Guide-To-Getting-Started-With-Jekyll-Part-2/)

Read [Jekyll Quick Start](http://jekyllbootstrap.com/usage/jekyll-quick-start.html)

Complete usage and documentation available at: [Jekyll Bootstrap](http://jekyllbootstrap.com)

[Building Static Sites with Jekyll](http://net.tutsplus.com/tutorials/other/building-static-sites-with-jekyll/)

[Template Data](https://github.com/mojombo/jekyll/wiki/Template-Data)

[Jekyll Wiki](https://github.com/mojombo/jekyll/wiki)

[Example sites](https://github.com/mojombo/jekyll/wiki/Sites)

[Liquid Extensions](https://github.com/mojombo/jekyll/wiki/liquid-extensions)


## Sample Posts

This blog contains sample posts which help stage pages and blog data.
When you don't need the samples anymore just delete the `_posts/core-samples` folder.

    $ rm -rf _posts/core-samples

Here's a sample "posts list".

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

## Create object function

This code creates a Javascript object (dah)!

{% highlight javascript linenos %}
function Route(routes) {

  this.routes = routes || {};

  this.notFound = function (res) {
    res.writeHead(404, {
      "Content-Type": "text/plain"
    });
    res.write("404 Not Found\n");
    res.end();
  };

}
{% endhighlight %}


## Highlighting test

{% highlight javascript linenos %}
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
{% endhighlight %}

## Start dev server

    jekyll --server

## Gist test
<style type="text/css">
.gist-highlight {
    border-left: 3ex solid #eee;
    position: relative;
}

.gist-highlight pre {
    counter-reset: linenumbers;
}

.gist-highlight pre div:before {
    color: #aaa;
    content: counter(linenumbers);
    counter-increment: linenumbers;
    left: -3ex;
    position: absolute;
    text-align: right;
    width: 2.5ex;
}
</style>
<script src="https://gist.github.com/2014200.js"> </script>
