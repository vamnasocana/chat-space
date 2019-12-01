$(function() {
  function buildHTML(message){
    if (message.image.url) {
      if (message.body) {
        var html = `<div class="message">
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                        ${message.name}
                        </div>
                        <div class="upper-message__date">
                        ${message.created_at}
                        </div>
                      </div>
                      <div class="lower-meesage">
                        <p class="lower-message__content">
                        ${message.body}
                        </p>
                        <img class = "lower-message__image" src = "${message.image.url}" >
                      </div>
                    </div>`
      } else {
        var html =  `<div class="message">
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                        ${message.name}
                        </div>
                        <div class="upper-message__date">
                        ${message.created_at}
                        </div>
                      </div>
                      <div class="lower-meesage">
                        <img class = "lower-message__image" src = "${message.image.url}" >
                      </div>
                    </div>`
      }
    } else {
      var html = `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.name}
                      </div>
                      <div class="upper-message__date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-meesage">
                      <p class="lower-message__content">
                      ${message.body}
                      </p>
                    </div>
                  </div>`
    }
    return html
  }

  $('.messages').animate({
    scrollTop: $('.messages')[0].scrollHeight
  });

  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData($(this).get(0));
    var url = $(this).attr('action');
    // formData.append('body', $('.form__message').val());
    // var file = $('#message_image').prop('files')[0];
    
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
});

