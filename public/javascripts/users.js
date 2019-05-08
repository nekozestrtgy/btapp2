$(function () {
  var room = '/' + $('#chat').data('room') + '-room'
  var socket = io(room);
  $('form').submit(function (e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function (msg) {
    $('#messages').append($('<li>').text(msg));
  });
});
