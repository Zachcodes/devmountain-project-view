update students 
set image = ${newUrl}
where user_id = ${id}
returning *;