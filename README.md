jQuery W3C DTF widget
=====================

Requirements
------------
Requires a jQuery, jQuery UI (Widget Factory only) and Underscore.js.

Usage
-----
Very simple for now:

    $("input[name='datefield']").w3cdtf({});

To use dates earlier than 1970, specify a `minDate`:

    $("input[name='datefield']").w3cdtf({
        minDate: new Date(1800,0,1,0,0,0)
    });

Limitations
-----------
Only handles dates for now.

