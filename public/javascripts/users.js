$(function () {
  var socket = io();
  $('form').submit(function (e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function (msg) {
    $('#messages').append($('<li>').text(msg));
  });
  socket.on('connect_error', function (err) {
    $('h2').text('サーバーに接続できません。接続状態を確認してください。');
  })
  socket.on('reconnect', function () {
    $('h2').text('');
  })
}); z
