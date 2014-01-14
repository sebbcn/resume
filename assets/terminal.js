var remove_extra_lines = function () {

    if ($('#shell span.cmd-line').length > 24) {
        $('#shell span.cmd-line').first().remove();
    }
}

var create_shell_line = function () {

    cmd_line = $('#new-cmd-line').clone().attr('id', '').appendTo('#shell');
    remove_extra_lines();

    $('#shell .cursor').hide().last().show();
    cmd_line.show();

}

var print_lines = function (lines) {

    for (var i = 0; i < lines.length; i++) {
        $('#shell span.cmd-line').last().after('<span class="cmd-line">' + lines[i] +'</span');
        remove_extra_lines();
    }
    
}

var enter_shell_mode = function () {
    mode = 'shell';
    $('.screen').hide();
    $('#shell').show();
    create_shell_line();
}

String.prototype.trim = function() {
   return this.replace(/^\s+|\s+$/g,"");
}

var filter_char = function(char) {

    if (char == ' ') { return '&nbsp;'; }
    else if (char == '>') { return '&gt;'; }
    else if (char == '<') { return '&lt;'; }
    else if (char == '"') { return '&quot;'; }
    else if (char == "'") { return '&apos;'; }
    else if (char == '&') { return '&amp;'; }
    else { return char; }
}

var get_last_char = function(str) {

    last_char = str.charAt(str.length - 1);
    if (last_char == ';') {
        index = str.lastIndexOf('&');
        if (index >= 0) {
            return str.slice(index);
        }
    }
    
    return last_char;
    
}

var append_char = function (e) {

    cmd_line = $('#shell .cmd').last();
    content = cmd_line.html();
    if (content.length < 70){
        added_char = String.fromCharCode(e.charCode)
        added_char = filter_char(added_char);
        cmd_line.html(content + added_char);
    }
}

var delete_char = function() {
    
    cmd_line = $('#shell .cmd').last();
    content = cmd_line.html().trim();
    if (content.length > 0){
        last_char = get_last_char(content);
        cmd_line.html(content.slice(0, content.length - last_char.length));    
    }

}

var run_command = function () {

    command = $('#shell .cmd').last().html();
    if  (command.length > 0) {

        if (command == 'man&nbsp;seb') {
            enter_manpage_mode('#manpage-seb');
        }
        else if (command.slice(0,2) == 'ls') {
            ls();
        }
        else if (command == 'help') {
            help();
        }
        else if (command.slice(0,4) == 'wget') {
            wget(command);
        }
        else {
            command_not_found();
        }
    }
    

}

var command_not_found = function() {

    var lines = [
        "Nop, try another one!",
    ];

    print_lines(lines);


}

var wget = function(command) {

    file = command.split('&nbsp;', 2)[1];

    if ((file == 'source.zip') || (file == 'public.key') || (file == 'resume.pdf'))
    {
        print_lines([ 'Downloading ' + file + '...']);    
        window.location.href = 'files/' + file;
    }
    else {
        print_lines([ 'File not found!']);
    }
}


var ls = function() {   
    
    var lines = [
        "-rw-rw-r--  1 seb seb 49728 Nov  6 01:20 resume.pdf",
        "-rw-rw-r--  1 seb seb&nbsp;&nbsp;8625 Nov  6 01:20 public.key",
        "-rw-rw-r--  1 seb seb&nbsp;56699 Nov  6 01:20 source.zip",
    ];

    print_lines(lines);

}

var help = function() {

    var lines =[
        "This is a small fake shell. You can try some of these commands:",
        "<br>",
        "# <strong>man seb</strong> My resume as a manpage",
        "# <strong>help</strong> This command",
        "# <strong>ls</strong> Lists the current directory content.",
        "# <strong>wget &lt;file_name&gt;</strong> Downloads the file.",
        ];

    print_lines(lines);
}


var run_shell = function(e) {   
    if (e.which == 13)
    {
            run_command();
            create_shell_line();
    }
    else if (e.which == 8)
    {
        delete_char();
    }
    else {
        append_char(e);    
    }
}

var page_scrolldown = function(page_id, manpage) {

    next_line = $(page_id +' span.show').last().next()
    if ((next_line.length > 0) && (next_line.attr('id') != 'manpage-footer')) {
        $(page_id +' span.show').first().removeClass('show').addClass('masked');
        next_line.addClass('show').removeClass('masked');
        if (manpage == true) {
            $('#line-count').html(parseInt($('#line-count').html()) + 1);    
        }
        
    }
}

var page_scrollup = function (page_id, manpage) {

    prev_line = $(page_id +' span.show').first().prev(); 
    if (prev_line.length > 0) {
        $(page_id +' span.show').last().removeClass('show').addClass('masked');
        prev_line.addClass('show').removeClass('masked');
        if (manpage) {
            $('#line-count').html(parseInt($('#line-count').html()) - 1);    
        }
    }
}

var enter_manpage_mode = function(manpage) {
    mode = 'manpage';
    $('.screen').hide();
    $(manpage).show();
}


var run_manpage = function(e) {
    if(e.keyCode == 40) {
        e.preventDefault();
        page_scrolldown('#manpage-seb', true);
    }
    else if (e.keyCode == 38) {
        e.preventDefault();
        page_scrollup('#manpage-seb', true);
    }
    else if(e.charCode == 113) {
        enter_shell_mode(); 
    }

}

var run_terminal = function(e) {

    if (mode == 'shell')
    {
        run_shell(e);        
    }   
    else if (mode == 'manpage') {
        run_manpage(e);    
    }

}

$(document).keypress(function(e) {
    if ($('#content-for-geeky-people').hasClass('terminal_visible')){
        run_terminal(e);    
    }
});