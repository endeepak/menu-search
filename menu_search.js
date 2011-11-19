// The MIT License
// Copyright (c) 2011 Deepak N
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// Version: 0.1
$(function(){
  var overlayCss = {
    'display': 'block',
    'opacity': 0.8,
    'position': 'fixed',
    'top': 0,
    'left': 0,
    'height': '100%',
    'width': '100%',
    'background-color': 'black',
    'z-index': 99,
  }

  var containerCss = {
    'width': '950px',
    'margin': '0 auto',
    'overflow': 'hidden',
  }

  var closeCss = {
    'font-size': '20px',
    'text-decoration': 'none',
    'font-weight': 'bold',
    'color': 'white',
    'float': 'right',
  }

  var closeDivCss = {
    'margin-bottom': '50px',
  }

  var searchFieldCss = {
    'outline': 'none',
    'width': '100%',
    'background' : 'none',
    'padding': '0px',
    'border': 'none',
    'height': 'auto',
    'font-size': '30px',
    'color': 'grey',
    'margin-bottom': '30px',
  }

  var menuSearchLinkCss = {
    'text-decoration': 'none',
    'font-size': '20px',
    'color': 'white',
  }

  var menuSearchLinkListCss = {
    'padding': '0 0 0 3px',
  }

  var menuSearchLinkListItemCss = {
    'display': 'inline-table',
    'list-style': 'none',
    'padding': '10px 10px 10px 0px',
    'width': '200px',
  }

  var selector = $('meta[name="menu-search-selector"]').attr('content') || '#menu';

  var menuItems = function(){
    var menuLinks = $(selector).find("li a[href!='#']").sort(function(linkLeft, linkRight){
      var left = $(linkLeft).text();
      var right = $(linkRight).text();
      return (left < right) ? -1 : (left > right) ? 1 : 0;
    })
    var $menuSearchLinks = $('<ul id=\"menu_search_links\"></ul>').css(menuSearchLinkListCss);
    $.map(menuLinks, function(link){
      var $newLink = $('<a/>').attr('href', $(link).attr('href')).text($(link).text()).css(menuSearchLinkCss);
      var $linkListItem = $('<li/>').css(menuSearchLinkListItemCss).append($newLink)
      $menuSearchLinks.append($linkListItem);
    });
    return $menuSearchLinks;
  }

  var elementCanReceiveUserInput = function(el) {
      var tag = el.tagName.toLowerCase();
      var blacklist = ['input', 'textarea', 'div', 'object', 'embed', 'select'];
      return ($.inArray(tag, blacklist) != -1) || el.contentEditable === 'true';
  }

  var closeSearch = function() {
    $overlay.hide();
    $searchField.blur();
  }

  var $overlay = $('<div id=\"menu_search_overlay\"></div>').css(overlayCss);
  var $container = $('<div id=\"menu_search_container\"></div>').css(containerCss);
  var $closeDiv = $('<div id=\"menu_search_close_div\"></div>').css(closeDivCss);
  var $close = $('<a id=\"menu_search_close\" title=\"Close Menu Search\" href=\"#\">X</a>').css(closeCss);
  var $searchField = $('<input type=\"text\" id=\"menu_search\" placeholder=\"Search\" />').css(searchFieldCss);
  $closeDiv.append($close);
  $container.append($closeDiv);
  $container.append($searchField);
  $container.append(menuItems());
  $overlay.append($container);

  $(window).keydown(function(e) {
    if(elementCanReceiveUserInput(e.target)) { return true; }
    else if(e.keyCode == 77) { //'m'
      $overlay.show();
      $searchField.val('');
      $searchField.focus();
      return false;
    }
  });

  $overlay.keydown(function(e) {
    if(e.keyCode == 27) { closeSearch(); } //Escape
    else if(elementCanReceiveUserInput(e.target)) { return true; }
    else if(e.keyCode == 8) { //Backspace
      $searchField.focus();
      return false;
    }
  });

  $overlay.click(function(){
    $searchField.focus();
  });

  $searchField.keyup(function(e) {
    var searchText = $searchField.val();
    var smartSearchText = $.trim(searchText);//TODO: Camel case expansion of search text
    var allLinks = $("#menu_search_links a");
    allLinks.hide();
    var matchingLinks = allLinks.filter(function() {
      return new RegExp(smartSearchText, "i").test($(this).text());
    });
    matchingLinks.show();
    if(e.keyCode == 13) { matchingLinks.first().focus(); } //Enter
  });

  $close.click(closeSearch);
  $(document.body).append($overlay.hide());
});