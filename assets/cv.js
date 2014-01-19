
var mode = 'manpage';

$('#show-terminal').click(function () {
    $('.back-to-start').show();
    $('#content-for-human-beings').removeClass('webpage_visible').addClass('webpage_invisible');
    $('#content-for-geeky-people').removeClass('terminal_invisible').addClass('terminal_visible');
})

$('#show-webpage').click(function () {
    $('.back-to-start').show();
    $('#content-for-geeky-people').removeClass('terminal_visible').addClass('terminal_invisible');
    $('#content-for-human-beings').removeClass('webpage_invisible').addClass('webpage_visible');

})

$('#seemore button').click(function () {
    $('.back-to-start').show();
    $('#content-for-human-beings').removeClass('webpage_invisible').addClass('webpage_visible');

})

$('.back-to-start').click(function () {
    $('.back-to-start').hide();
    $('#content-for-geeky-people').removeClass('terminal_visible').addClass('terminal_invisible');
    $('#content-for-human-beings').removeClass('webpage_visible').addClass('webpage_invisible');
})
