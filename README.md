#Menu Search

List and Search menus nested under top level menus. Inspired by [gleeBox](http://thegleebox.com/)

##Dependencies

  [jQuery](http://jquery.com/)

##Usage

Add the menu_search javascript file and define menu selector(defaults to #menu) in a meta tag

        <script src="/javascripts/jquery.js" type="text/javascript"></script>
        <script src="/javascripts/menu_search.js" type="text/javascript"></script>
        <meta name="menu-search-selector" content="#my-app-menu">


##Shortcut Mapping

When menu search is not open

        m: Open menu search

On menu search screen

        m: Focus menu search
        Esc: Close menu search
        Enter: Focus first matched menu

##Compatibility

Tested with

* jQuery(v1.6.2)

Browsers

  * Chrome(17.0.942) [Best experience so far. Chrome supports tabbing through visible links on page]
  * Firefox(6.0.2).

##LICENSE

The MIT License
Copyright (c) 2011 Deepak N
