$(function(){
  function buildHTML(message){
    if(message.content != null){
      message_content = `<p class="lower-message__content">
                          ${message.content}
                        </p>`
    } else {
      message_content = ""
    }
    if(message.image != null){
      message_image = `<img src="${message.image}" class="lower-message__image">`
    } else {
      message_image = ""
    }
    var html = `<div class="message" data-message-id="${ message.id }">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    ${message_content}
                    ${message_image}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);

    $('.form__submit').removeAttr('data-disable-with')

    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      console.log(data)
      $('.messages').append(html)
      $('.form__messsage').val('')
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
  })

  var interval = setInterval(function() {

    var last_message = $('.message').last().data('message-id');

    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        type: "GET",
        data: { id: last_message },
        dataType: 'json'
      })
      .done(function(data) {
        data.forEach(function(message) {
          $('.messages').append(buildHTML(message));
        });

      })
      .fail(function(data) {
        alert('自動更新に失敗しました');
      })
      console.log();
    } else {
      clearInterval(interval);
    }
  } , 5000 );
});
