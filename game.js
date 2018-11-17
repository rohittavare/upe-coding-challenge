const request = require('request-promise-native');

var game = function() {
    this.token = '';
}

game.prototype.new_session = async (id) => {
    //do a post request to get the game token
    this.token = await request({ uri:'http://ec2-34-216-8-43.us-west-2.compute.amazonaws.com/session', method: 'POST', form: { uid: process.env['UID'] }, transform: body => { return JSON.parse(body).token }});
}

game.prototype.get_level_data = async () => {
    return await request({ uri: 'http://ec2-34-216-8-43.us-west-2.compute.amazonaws.com/game?token='+this.token, transform: body => {return JSON.parse(body) }});
}

game.prototype.move_up = async () => {
    return await request({uri: 'http://ec2-34-216-8-43.us-west-2.compute.amazonaws.com/game?token='+this.token, method: 'POST', form: {action: 'UP'}, transform: body => { return JSON.parse(body).result}});
}

game.prototype.move_left = async () => {
    return await request({uri: 'http://ec2-34-216-8-43.us-west-2.compute.amazonaws.com/game?token='+this.token, method: 'POST', form: {action: 'LEFT'}, transform: body => { return JSON.parse(body).result}});
}

game.prototype.move_right = async () => {
    return await request({uri: 'http://ec2-34-216-8-43.us-west-2.compute.amazonaws.com/game?token='+this.token, method: 'POST', form: {action: 'RIGHT'}, transform: body => { return JSON.parse(body).result}});
}

game.prototype.move_down = async () => {
    return await request({uri: 'http://ec2-34-216-8-43.us-west-2.compute.amazonaws.com/game?token='+this.token, method: 'POST', form: {action: 'DOWN'}, transform: body => { return JSON.parse(body).result}});
}

module.exports = game;
