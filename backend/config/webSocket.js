const socketio = require('socket.io');
const parseStringToArray = require('../src/utils/ParseStringToArray');
const { getDistanceFromLatLonInKm } = require('../src/utils/CalculateDistance');
const connections = [];
let io;
exports.setupWebSocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        const { latitude, longitude, searchValue } = socket.handshake.query;
        connections.push({
            id : socket.id,
            coordinates : {
                latitude : Number(latitude),
                longitude : Number(longitude),
            },
            course_of_preference : parseStringToArray(searchValue)
        });
    });
}

exports.findConnections = (coordinates, course_of_preference) => {
    return connections.filter( connection => {
        return getDistanceFromLatLonInKm(coordinates, connection.coordinates) < 10 &&
        connection.course_of_preference.some( course => course_of_preference.includes(course) );
    });
}

exports.sendMessage = (to, message, data) => {
    to.forEach( connection => {
        io.to(connection.id).emit(message, data);
    });
}