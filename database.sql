CREATE TABLE tasks (
	id serial primary key,
	task varchar(50) NOT NULL,
	completed BOOLEAN
);

UPDATE tasks SET completed = 'f';

ALTER TABLE tasks ALTER COLUMN completed SET NOT NULL;

INSERT INTO tasks ("task", "completed")
VALUES
('Return Dress', 'f'),
('Buy Bananas', 'f');
('Research Climate Control', 'f');
