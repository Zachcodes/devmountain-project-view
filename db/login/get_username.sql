select * from user_login_info ul
join users u
on ul.user_id = u.id
where LOWER(username) = ${username}