$(function () {
  var socket = io();
  var login_user_name = $('#chat').data('login_user_name')
  var login_password = $('#chat').data('login_password')
  $('.m').submit(function (e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function (msg) {
    $('#messages').append($('<li>').text(msg));
  });
  $(window).load(function () {
    setTimeout(function () {
      $('.chat_room').css('display', 'none');
      $('.timeout_login').css('display', 'block');
    }, 10 * 1000);//10秒
  });
  $('.login').submit(function (e) {
    e.preventDefault();
    var input_user_name = $('.user_name').val();
    var input_password = $('.password').val();
    if (login_user_name == input_user_name && login_password == input_password) {
      $('.chat_room').css('display', 'block');
      $('.timeout_login').css('display', 'none');
    }
  })
});
