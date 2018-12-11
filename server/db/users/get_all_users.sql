select u.name, uli.username, uli.id as userLoginId from users u 
join user_login_info uli 
on u.id = uli.user_id;