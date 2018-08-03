insert into users (name, role_id, email)
values (${name}, ${roleId}, ${email})

returning *;