-- All of the tables with no constraints are created first
CREATE TABLE cohort_type (
    id SERIAL PRIMARY KEY,
    type TEXT
);

CREATE TABLE document_types (
    id SERIAL PRIMARY KEY,
    type TEXT
);

CREATE TABLE project_images_types (
    id SERIAL PRIMARY KEY,
    type TEXT
);

CREATE TABLE project_tags (
    id SERIAL PRIMARY KEY,
    tag_name TEXT CHECK (tag_name = lower(tag_name))
);

CREATE TABLE project_type (
    id SERIAL PRIMARY KEY,
    type TEXT
);

CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    type TEXT
);

-- Now the tables that link back to tables above
CREATE TABLE cohorts (
    id SERIAL PRIMARY KEY,
    name TEXT,
    cohort_type INT REFERENCES cohort_type(id)
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    url TEXT,
    project_name TEXT UNIQUE,
    project_type INT REFERENCES project_type(id),
    cohort_id INT REFERENCES cohorts(id),
    active BOOLEAN DEFAULT true,
    description TEXT,
    walkthrough_link TEXT,
    last_featured DATE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    role_id INT REFERENCES user_roles(id),
    email TEXT NOT NULL
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first TEXT,
    last TEXT,
    cohort INT REFERENCES cohorts(id),
    image TEXT,
    about TEXT,
    user_id INT REFERENCES users(id)
);

CREATE TABLE user_login_info (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT,
    user_id INT REFERENCES users(id)
);

CREATE TABLE project_ratings (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id),
    user_id INT REFERENCES users(id),
    rating INT
);

CREATE TABLE average_project_ratings (
    id SERIAL PRIMARY KEY,
    average_rating NUMERIC,
    project_id INT REFERENCES projects(id)
);

CREATE TABLE projects_students_link (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    project_id INT REFERENCES projects(id)
);

CREATE TABLE projects_tags_link (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id),
    tag_id INT REFERENCES project_tags(id)
);

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    document_url TEXT,
    project_id INT REFERENCES projects(id)
);

CREATE TABLE daily_featured_projects (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id),
    featured_date DATE
);

CREATE TABLE projects_images (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id),
    image_type_id INT REFERENCES project_images_types(id),
    image_url TEXT
);



