update project_ratings 
set rating = ${rating}
where id = ${ratingId}
and user_id = ${userId}

returning rating;