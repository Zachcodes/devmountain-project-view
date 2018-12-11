update user_login_info 
set password = ${hash}
where id = ${userId};