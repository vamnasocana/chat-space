$(function() {
  function buildHTML(message){
    var message_body = message.body? message.body : "" ;
    var message_image = message.image? message.image : "" ;
    var html = `<div class="message" data-message-id=${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                    ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                    ${message_body}
                    </p>
                    <img class = "lower-message__image" src = "${message_image}" >
                  </div>
                </div>`
    return html
  }
  if($('.messages').length){
    $('.messages').animate({
      scrollTop: $('.messages')[0].scrollHeight
    });
  }

  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData($(this).get(0));
    var url = $(this).attr('action');
    
    $.ajax({
      url : url,
      type : 'POST',
      processData: false,
      data : formData,
      dataType : "json",
      processData : false,
      contentType : false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $("#new_message")[0].reset();
      $('.form__submit').prop('disabled', false);

    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $("#new_message")[0].reset();
      $('.form__submit').prop('disabled', false);
    })
  });
 
  var reloadMessages = function(){
    var last_message_id = $('.message:last').data('message-id');
    console.log(last_message_id)
    var url = "/groups/" + $('.messages').data('group-id') + "/api/messages"
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      // console.log(messages)
      var insertHTML = '';
      $.each(messages, function(i, message) {
        // console.log(message)
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
    })
    .fail(function(){
      console.log('error');
    });
  };
  if($('.messages').length){
  setInterval(reloadMessages, 7000);
  };
});

