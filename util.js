const clear = require('clear');

var board;
var level_times = [];
var player_x;
var player_y;
var start_time;

var init_level = (height, width, startr, startc) => {
    board = [];
    for(var i = 0; i < parseInt(height); i++) {
        var a = [];
        for(var j = 0; j < parseInt(width); j++) {
            a.push('.');
        }
        board.push(a);
    }
    player_x = parseInt(startc);
    player_y = parseInt(startr);
}

var start_timer = () => { start_time = new Date(); }
var get_elapsed_time = () => { var current_time = new Date(); var diff = current_time - start_time; return Math.floor(diff / 1000); }
var add_level_time = () => { var total = 0; level_times.forEach((elem) => { total += elem; }); level_times.push(Math.floor((new Date() - start_time) / 1000) - total ); }
var print_level_times = () => { clear(); console.log('Times per level:'); level_times.forEach((time, ind) => { console.log('level ' + (ind + 1) + ': ' + Math.floor(time/60) + ' m ' + (time%60) + ' s'); });}

var add_obstacle = (r, c) => { if(r >= 0 && c >= 0 && r < board.length && c < board[0].length)board[r][c] = '*'; }
var move_up = () => { board[player_y][player_x] = '#'; player_y--; }
var move_down = () => { board[player_y][player_x] = '#'; player_y++; }
var move_right = () => { board[player_y][player_x] = '#'; player_x++; }
var move_left = () => { board[player_y][player_x] = '#'; player_x--; }
var get_pos = () => { return [player_x, player_y]; }

var cant_move_up = () => { return player_y > 0 && board[player_y - 1][player_x] == '#';}
var cant_move_down = () => { return player_y < board.length - 1 && board[player_y + 1][player_x] == '#';}
var cant_move_right = () => { return player_x < board[0].length - 1 && board[player_y][player_x + 1] == '#';}
var cant_move_left = () => { return player_x > 0 && board[player_y][player_x - 1] == '#';}

var strfy = () => {
    var str = '';
    board.forEach((row, row_num) => {
        row.forEach((cell, cell_num) => {
            if(row_num == player_y && cell_num == player_x) str += '@';
            else str += cell;
        });
        str += '\n';
    });
    return str;
}

var print_interface = (data) => {
    clear();
    console.log('Current status: level ' + (data.levels_completed + 1) + '/' + data.total_levels + ' size: ' + data.maze_size[0] + ', ' + data.maze_size[1]);
    var etime = get_elapsed_time();
    var min = Math.floor(etime/60);
    console.log('Elapsed time: ' + min + ' m ' + (etime%60) + ' s');
    console.log('Player position: ' + player_x + ', ' + player_y);
    console.log(strfy());
}

module.exports = {
    print_interface: print_interface,
    start_timer: start_timer,
    add_level_time: add_level_time,
    print_level_times: print_level_times,
    add_obstacle: add_obstacle,
    move_up: move_up,
    move_down: move_down,
    move_right: move_right,
    move_left: move_left,
    cant_move_up: cant_move_up,
    cant_move_down: cant_move_down,
    cant_move_right: cant_move_right,
    cant_move_left: cant_move_left,
    get_pos: get_pos,
    strfy: strfy,
    init_level: init_level
}
