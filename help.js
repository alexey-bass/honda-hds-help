$(function () {
    $("img.lazy").lazyload();

    var params = [],
        offset, p, t, m;

    $('p.mnemonic').each(function (i, mnemonic) {
        mnemonic = $(mnemonic);
        offset = mnemonic.offset();

        p = mnemonic.next().next();
        while (p.text().length < 2) {
            p = p.next();
        }

        t = $.trim(p.text()).split("\n");
        m = t[0].match(/([^:]+)/);

        m[1] = m[1].replace(/"/g, '');

        // 0: param name
        // 1: top offset
        params.push([m[1], Math.round(offset.top)]);
    });

    params.sort(function (a, b) {
        a = a[0].toLowerCase(), b = b[0].toLowerCase();
        if (a < b) return -1;
        if (a > b) return  1;
        return 0;
    });

    var html = '<ul>';
    for (var i in params) {
        html += '<li onclick="$(\'body\').scrollTop(' + params[i][1] + ');">' + params[i][0] + '</li>';
    }
    html += '</ul>';
    $('body').prepend('<div id="toc">' + html + '</div>');
    
    $('p.mnemonic').append('<span class="goto-top" onclick="$(\'body\').scrollTop(0);">Back to top</span>')
});
