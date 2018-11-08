const clear = require('clear');

var board;
var player_x;
var player_y;

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

add_obstacle = (r, c) => { if(r >= 0 && c >= 0 && r < board.length && c < board[0].length)board[r][c] = '*'; }
move_up = () => { board[player_y][player_x] = '#'; player_y--; }
move_down = () => { board[player_y][player_x] = '#'; player_y++; }
move_right = () => { board[player_y][player_x] = '#'; player_x++; }
move_left = () => { board[player_y][player_x] = '#'; player_x--; }
get_pos = () => { return [player_y, player_x]; }

cant_move_up = () => { return player_y > 0 && board[player_y - 1][player_x] == '#';}
cant_move_down = () => { return player_y < board.length - 1 && board[player_y + 1][player_x] == '#';}
cant_move_right = () => { return player_x < board[0].length - 1 && board[player_y][player_x + 1] == '#';}
cant_move_left = () => { return player_x > 0 && board[player_y][player_x - 1] == '#';}

strfy = () => {
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
    console.log('Current status: level ' + (data.levels_completed + 1) + ' size: ' + data.maze_size[0] + ', ' + data.maze_size[1]);
    console.log(board.length +', '+ board[0].length);
    console.log('Player position: ' + data.current_location[0] + ', ' + data.current_location[1]);
    console.log(strfy());
}

module.exports = {
    print_interface: print_interface,
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
