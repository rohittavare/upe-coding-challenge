const game = require('./game');
var g = new game();

var direction = {
    'LEFT':'move_left',
    'RIGHT':'move_right',
    'UP':'move_up',
    'DOWN':'move_down'
}

var opposite_direction = {
    'LEFT':'move_right',
    'RIGHT':'move_left',
    'UP':'move_down',
    'DOWN':'move_up'
}

var try_direction = async (dir) => {
    var res = await g[direction[dir]]();
    if(res === 'END') return true;
    else if(res === 'SUCCESS' && (try_direction('DOWN') || try_direction('RIGHT') || try_direction('UP') || try_direction('LEFT'))) return true;
    else return false;
}

var solve_level = () => {
    return (try_direction('DOWN') || try_direction('RIGHT') || try_direction('UP') || try_direction('LEFT'));
}

(async () => {
    await g.new_session('704984314');
    var data = await g.get_level_data();
    while(data.status === 'PLAYING') {
        console.log('Playing level ' + (data.levels_completed + 1));
        if(solve_level()) {console.log('Solved level!');}
        else {console.log('Level could not be solved :(');}
    }
})();
