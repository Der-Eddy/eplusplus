// ==UserScript==
// @name        Elitepvpers++
// @namespace   Elitepvpers
// @description E++
// @include     *//www.elitepvpers.com/forum/*
// @author      Der-Eddy
// @version     1.3.1
// @downloadURL https://github.com/Der-Eddy/eplusplus/raw/master/Elitepvpers%2B%2B.user.js
// @grant       none
// ==/UserScript==
(function($){
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1);
    $('div.smallfont span.time:first').parent().append('<div id="eplusplus" style="cursor: pointer; text-decoration: underline;">E++ v' + GM_info['script']['version'] +' loaded</div>');
    //console.log('E++ v' + GM_info['script']['version'] +' loaded');

    function appendStyle(url){
        if (url){
            console.log('url!');
            $('<link>', {
                rel: 'stylesheet',
                type: 'text/plain',
                href: url
            }).appendTo('head');
        }
    }

    function appendStyleRaw(style){
        if (style){
            $('<style type="text/css">' + style + '</style>').appendTo('head');
        }
    }

    function colorBorder(set){
        if (set){
            $('img[src*="elitepvpers.com/forum/images/teamicons/relaunch/moderator.png"]').parent().parent().css('border-right', '3px solid green');
            $('img[src*="elitepvpers.com/forum/images/teamicons/relaunch/commanager.png"]').parent().parent().css('border-right', '3px solid blue');
            //$('img[src*="elitepvpers.com/forum/images/teamicons/relaunch/moderator.png"]').parent().parent().parent().parent().parent().find('t.thead').css('background: green;');
            $('img[src*="elitepvpers.com/forum/images/teamicons/relaunch/globalmod.png"]').parent().parent().css('border-right', '3px solid orange');
            $('img[src*="elitepvpers.com/forum/images/teamicons/relaunch/coadmin.png"]').parent().parent().css('border-right', '3px solid red');
        }
    }

    function mentionsRead(set){
        if (set){
            var readQuotes = $('a[href*="usertag.php?do=profilenotif&tab=quotes"]').parent().parent();
            readQuotes.children(':first-child').append(' <div class="smallfont" id="readQuotes" style="text-decoration: underline; color: #22229C;"><a>(Mark as read)</a></div>');
            var readMentions = $('a[href*="usertag.php?do=profilenotif&tab=mentions"]').parent().parent();
            readMentions.children(':first-child').append(' <div class="smallfont" id="readMentions" style="text-decoration: underline; color: #22229C;"><a>(Mark as read)</a></div>');

            $('div#readQuotes').click(function() {
                $.ajax({ url: '//www.elitepvpers.com/forum/usertag.php?do=profilenotif&tab=quotes', type: 'GET' });
                readQuotes.children(':last-child').html('<a rel="nofollow" href="usertag.php?do=profilenotif&amp;tab=mentions">0</a>');
            });

            $('div#readMentions').click(function() {
                $.ajax({ url: '//www.elitepvpers.com/forum/usertag.php?do=profilenotif&tab=mentions', type: 'GET' });
                readMentions.children(':last-child').html('<a rel="nofollow" href="usertag.php?do=profilenotif&amp;tab=mentions">0</a>');
            });
        }
    }

    function currencyConverter(set){
        if (set){
            // Check for trading section
            if (/trading\//.test(url)){
                appendStyleRaw(
                    '.slidein { \
                      position: fixed; \
                      left: -180px; \
                      bottom: 50px; \
                      padding: 10px; \
                      width: 220px; \
                      height: 170px; \
                      border: 1px solid black; \
                      border-radius: 5px; \
                      background: #EDEDED; \
                      opacity: 0.6; \
                      transition: 0.4s 2s; \
                    } \
                    .slidein:hover { \
                      transition: 0.4s; \
                      left: 10px; \
                    } \
                    .slidein:after { \
                      content: ""; \
                      position: absolute; \
                      top: 0px; \
                      left: 238px; \
                      width: 0; \
                      height: 0; \
                      opacity: 0.6; \
                      border: 95px solid transparent; \
                      border-left: 12px solid #ccc; \
                    } \
                    .slidein:before { \
                      content: ""; \
                      position: absolute; \
                      top: 0px; \
                      left: 239px; \
                      width: 0; \
                      height: 0; \
                      opacity: 0.6; \
                      border: 95px solid transparent; \
                      border-left: 12px solid #999; \
                    }'
                );

                $('body').append(
                    '<div class="slidein"> \
                      <br><div style="text-align: center;">Elite*gold Currency Converter \
                        <br><br> \
                        <input id="ex_euro" size="5" value="10" type="text"> € = \
                        <input id="ex_rate" size="5" type="text"> <img src="https://www.elitepvpers.com/images/tbm/gold.gif"></div> \
                      <br><br> \
                      <div style="text-align: center;">Converter \
                        <br> \
                        <input id="euro" size="5" type="text" disabled> € <span style="font-size: 2em; margin: 10px 0;">&#8596</span> \
                        <input id="eg" size="5" type="text" disabled> <img src="https://www.elitepvpers.com/images/tbm/gold.gif"> \
                      </div> \
                    </div>'
                );

                $('#ex_rate').bind('input', function() {
                  $('#euro').removeAttr('disabled');
                  $('#euro').val('');
                  $('#eg').removeAttr('disabled');
                  $('#eg').val('');
                });

                $('#euro').bind('input', function() {
                  $('#eg').val(Math.round((parseInt($('#ex_rate').val()) / parseInt($('#ex_euro').val())) * parseFloat($(this).val().replace(',', '.'))));
                });

                $('#eg').bind('input', function() {
                  $('#euro').val(Math.round(((parseInt($('#ex_euro').val()) / parseInt($('#ex_rate').val())) * parseInt($(this).val())) * 100) / 100);
                });
            }
        }
    }

    function optionsModal(set){
        if (set){
            appendStyleRaw(
                '.modal-box { \
                  padding: 20px; \
                  overflow: hidden; \
                  width: 400px; \
                  height: 500px; \
                  border: 1px solid black; \
                  border-radius: 10px; \
                  background: #EDEDED; \
                  position: absolute; \
                  margin-left: -150px; \
                  left: 50%; \
                  top: 20%; \
                  display: none; \
                  z-index: 10; \
                } \
                #darken { \
                  position: absolute; \
                  left: 0; \
                  top: 0; \
                  width: 100%; \
                  height: 100%; \
                  background-color: #000; \
                  opacity: 0.6; \
                  z-index: 1; \
                  display: none; \
                } \
                .modal-button { \
                  position: absolute; \
                  bottom: 20px; \
                  right: 20px; \
                  background: rgb(28, 184, 65); \
                  font-family: inherit; \
                  font-size: 100%; \
                  padding: 0.5em 1em; \
                  color: white!important; \
                  border: 1px solid #999; \
                  border: none rgba(0, 0, 0, 0); \
                  text-decoration: none; \
                  border-radius: 2px; \
                } \
                .modal-button-hover, \
                .modal-button:hover, \
                .modal-button:focus { \
                  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(transparent), color-stop(40%, rgba(0, 0, 0, 0.05)), to(rgba(0, 0, 0, 0.10))); \
                  background-image: -webkit-linear-gradient(transparent, rgba(0, 0, 0, 0.05) 40%, rgba(0, 0, 0, 0.10)); \
                  background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.10)); \
                  background-image: -o-linear-gradient(transparent, rgba(0, 0, 0, 0.05) 40%, rgba(0, 0, 0, 0.10)); \
                  background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.05) 40%, rgba(0, 0, 0, 0.10)); \
                } \
                .modal-button:focus { \
                  outline: 0; \
                } \
                .modal-button-active, \
                .modal-button:active { \
                  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15) inset, 0 0 6px rgba(0, 0, 0, 0.20) inset; \
                  border-color: #000\9; \
                }'
            );

            $('body').append(
                '<div id="darken"></div> \
                <div class="modal-box"> \
                  <h3> \
                  E++ Options \
                  </h3> \
                  <p> \
                    Only a test atm \
                  </p> \
                  <a href="#" id="ok-button" class="modal-button">Ok</a> \
                </div>'
            );

            $('#eplusplus').click(function() {
                console.log("jo");
              $('.modal-box').fadeIn();
              $('#darken').fadeIn();
            });

            $('#darken').click(function() {
              $('.modal-box').fadeOut();
              $('#darken').fadeOut();
            });

            $('#ok-button').click(function() {
              $('.modal-box').fadeOut();
              $('#darken').fadeOut();
            });
        }
    }

    /*
    if (filename == 'usercp.php'){
        var table = $('tbody#collapseobj_usercp_subthreads').parent().parent();
        table.prepend('<table class="tborder" align="center" border="0" cellpadding="3" cellspacing="0" width="100%"><thead><tr><td class="tcat" colspan="3">Notifications<span class="normal">: (1)</span></td></tr></thead><tbody id="collapseobj_usercp_notifications" style=""><tr class="thead"><td class="thead" width="100%">Notification / Type</td><td class="thead" align="center" nowrap="nowrap" width="150">Mark as red</td></tr><tr><td class="alt1"><img src="https://www.elitepvpers.com/forum/images/elitepvpers/statusicon/thread_dot_hot_new.gif" border="" height="16" width="16"></td><td class="alt1">New Quotes<div class="smallfont" style="text-align:right; white-space:nowrap">Mark as read</div></td></tr></tbody></table>');
    }
    */

    colorBorder(true);
    mentionsRead(true);
    optionsModal(true);
    currencyConverter(true);
})(jQuery);
