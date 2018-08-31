update students 
set about = ${about}
where user_id = ${id}
returning *;