select id as project_image_id,
project_id,
image_url,
image_type_id 
from projects_images
where project_id = ${project_id};