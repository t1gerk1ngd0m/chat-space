$(function(){
  function buildHTML(message){
    console.log(message);
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
    var html = `<div class="message">
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
      $('.messages').append(html)
      $('.form__messsage').val('')
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
  })
});
