insert into users (name, role_id)
values (${name}, ${roleId})

returning *;