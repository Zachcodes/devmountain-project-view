select id, avg(rating), project_id from project_ratings
group by id;