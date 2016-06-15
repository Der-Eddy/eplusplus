// ==UserScript==
// @name        Elitepvpers++
// @namespace   Elitepvpers
// @description E++
// @include     *//www.elitepvpers.com/forum/*
// @author      Der-Eddy
// @version     1.2
// @grant       none
// ==/UserScript==
(function($){
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1);
    $('div.smallfont span.time:first').parent().append('<br>E++ v' + GM_info['script']['version'] +' loaded');

    function colorBorder(set){
        if (set){
            $('img[src*="elitepvpers.com/forum/images/teamicons/relaunch/moderator.png"]').parent().parent().css('border-right', '3px solid green');
            $('img[src*="elitepvpers.com/forum/images/teamicons/relaunch/moderator.png"]').parent().parent().parent().parent().parent().find('t.thead').css('background: green;');
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

    /*
    if (filename == 'usercp.php'){
        var table = $('tbody#collapseobj_usercp_subthreads').parent().parent();
        table.prepend('<table class="tborder" align="center" border="0" cellpadding="3" cellspacing="0" width="100%"><thead><tr><td class="tcat" colspan="3">Notifications<span class="normal">: (1)</span></td></tr></thead><tbody id="collapseobj_usercp_notifications" style=""><tr class="thead"><td class="thead" width="100%">Notification / Type</td><td class="thead" align="center" nowrap="nowrap" width="150">Mark as red</td></tr><tr><td class="alt1"><img src="https://www.elitepvpers.com/forum/images/elitepvpers/statusicon/thread_dot_hot_new.gif" border="" height="16" width="16"></td><td class="alt1">New Quotes<div class="smallfont" style="text-align:right; white-space:nowrap">Mark as read</div></td></tr></tbody></table>');
    }
    */

    colorBorder(true);
    mentionsRead(true);
})(jQuery);
