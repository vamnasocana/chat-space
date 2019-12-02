json.id  @message.id
json.body  @message.body
json.image  @message.image
json.user_id  @message.user.id
json.created_at  @message.created_at.strftime("%Y/%m/%d %H:%M")
json.updated_at  @message.updated_at
json.name  @message.user.name