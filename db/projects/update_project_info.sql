update projects
set description = ${description}, url = ${project_link}, project_name = ${project_name}
where id = ${project_id}
returning *;