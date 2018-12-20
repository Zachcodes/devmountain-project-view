update students 
set about = ${about}, 
first = ${first},
last = ${last},
email = ${email},
linkedin = ${linkedin},
portfolio = ${portfolio},
github = ${github},
image = ${image}
where user_id = ${id}
returning *;