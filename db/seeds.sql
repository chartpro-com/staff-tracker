INSERT INTO department (dept_name)
VALUES 
('Trading'),
('Budget | Finance'),
('Technology');


INSERT INTO job (title, salary, department_id)
VALUES 
('Trader', 175000, 1),
('Hedger', 145000, 1),
('Assistant', 118000, 1),
('Head Auditor', 100000, 2),
('Accountant', 90000, 2),
('Engineer', 95000, 3),
('IT Admin', 60000, 3);

INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES 
('Phil', 'Gellos', 1, NULL),
('Rony', 'Schlapfer', 2, 1),
('Omar', 'Sadik', 3, 2),
('Tom', 'McGrath', 4, NULL),
('Mike', 'Roth', 5, 4),
('Dave', 'Greiner', 6, NULL),
('Matt', 'Ming', 7, NULL);
