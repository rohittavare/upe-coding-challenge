const game = require('./game');
const util = require('./util');

var g = new game();
var data = {};
var level = 0;

var direction = {
    'LEFT':'move_left',
    'RIGHT':'move_right',
    'UP':'move_up',
    'DOWN':'move_down'
}

var opposite_direction = {
    'LEFT':'RIGHT',
    'RIGHT':'LEFT',
    'UP':'DOWN',
    'DOWN':'UP'
}

var try_direction = async (dir) => {
    if(util['cant_'+direction[dir]]()) return false;
    var res = await g[direction[dir]]();
    data = await g.get_level_data();
    if(data.levels_completed + 1 != level) {
        level = data.levels_completed + 1;
        return true;
    } else if(res === 'WALL') {
        switch(dir) {
            case 'UP':
                util.add_obstacle(data.current_location[1] - 1, data.current_location[0]);
                break;
            case 'DOWN':
                util.add_obstacle(data.current_location[1] + 1, data.current_location[0]);
                break;
            case 'RIGHT':
                util.add_obstacle(data.current_location[1], data.current_location[0] + 1);
                break;
            case 'LEFT':
                util.add_obstacle(data.current_location[1], data.current_location[0] - 1);
                break;
        }
        return false;
    } else if(res === 'SUCCESS') {
        util[direction[dir]]();
        util.print_interface(data);
        console.log(res);
        if( await try_direction('DOWN') || await try_direction('RIGHT') || await try_direction('UP') || await try_direction('LEFT')) return true;
        else {
            res = await g[direction[opposite_direction[dir]]]();
            if(res != 'SUCCESS') console.log('COULDNT GO BACK');
            util[direction[opposite_direction[dir]]]();
            util.print_interface(data);
            return false;
        }
    } else if(res === 'END') return true;
    else return false;
}

var solve_level = async () => {
    return (await try_direction('DOWN') || await try_direction('RIGHT') || await try_direction('UP') || await try_direction('LEFT'));
}

(async () => {
    console.log('Starting game...');
    await g.new_session('704984314');
    data = await g.get_level_data();
    level = data.levels_completed + 1;
    while(data.status === 'PLAYING') {
        util.init_level(data.maze_size[1], data.maze_size[0], data.current_location[1], data.current_location[0]);
        if(await solve_level()) {console.log('Solved level!');}
        else {console.log('Level could not be solved :(');}
        data = await g.get_level_data();
    }
})();
