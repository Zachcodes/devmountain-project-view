insert into users (name, role_id, email, devmtn_id)
values (${name}, ${role_id}, ${email}, ${devmtn_id})

returning *;