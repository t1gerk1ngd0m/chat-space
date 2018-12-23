json.content @message.content
json.group_id @message.group.id
json.user_name @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.image @message.image.url
