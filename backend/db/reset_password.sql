update user_login_info 
set password = ${hash}
where user_id = ${userId};