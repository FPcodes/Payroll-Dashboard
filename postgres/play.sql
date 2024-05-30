INSERT INTO officialhoursubmission (
  paysub_id,
  project_id, 
  empl_id, 
  payperiod, 
  monday, 
  tuesday, 
  wednesday, 
  thursday, 
  friday, 
  saturday, 
  sunday, 
  totalhours
)
VALUES 
(51, 1, 200001, '2024-04-28', 0, 0, 0, 7.5, 7.5, 0, 0, 15),
(52, 1, 200003, '2024-04-28', 0, 0, 0, 7.5, 7.5, 0, 0, 15),
(53, 1, 200004, '2024-04-28', 0, 0, 0, 7.5, 7.5, 0, 0, 15),
(54, 1, 200006, '2024-04-28', 0, 0, 0, 7.5, 7.5, 0, 0, 15),
(55, 3, 200001, '2024-04-28', 7.5, 7.5, 7.5, 0, 0, 0, 0, 22.5),
(56, 3, 200003, '2024-04-28', 7.5, 7.5, 7.5, 0, 0, 0, 0, 22.5),
(57, 3, 200004, '2024-04-28', 7.5, 7.5, 7.5, 0, 0, 0, 0, 22.5),
(58, 3, 200006, '2024-04-28', 7.5, 7.5, 7.5, 0, 0, 0, 0, 22.5);

K499 I think 
Monday Tuesday Thursday Friday 
200003 Kathy 
200001 Delnys 
200004 Manny
200006 Mario 


7.5	7.5	7.5	0	0			22.5
7.5	7.5	7.5	0	0			22.5
7.5	7.5	7.5	0	0			22.5
7.5	7.5	7.5	0	0			22.5
7.5	7.5	7.5	0	0			22.5
0	0	0	7.5	7.5			15
0	0	0	7.5	7.5			15
0	0	0	7.5	7.5			15
0	0	0	7.5	7.5			15

// 

INSERT INTO officialweeklyprinfo (
projectpayrollid, 
netpayroll,  
ficatax, 
fedtax, 
statetax, 
citytax, 
lunafica,
lunafuta,
lunasudi,
payrollfee, 
totalexpenses,
payperiod,
tax_owed
)
VALUES 
(11, 6173.97, 614.56,	658.68,	353.84,	196.71,	614.48,	12.05, 82.33, 0, 8706.62, '2024-04-28', 2532.65);


INSERT INTO officialpayrollinfo (
paysub_id, 
project_id, 
empl_id, 
payperiod,
payrate, 
totalhours, 
grosspay, 
ficatax, 
fedtax, 
statetax, 
citytax, 
suditax, 
netpay
)
VALUES 
(51, 1, 200001, '2024-04-28', 63.00, 15, 945.00, 72.3, 75.25, 40.98, 30.33, 4.12, 722.02),
(52, 1, 200003, '2024-04-28', 63.00, 15, 945.00, 72.3, 75.25, 40.98, 30.33, 4.12, 722.02),
(53, 1, 200004, '2024-04-28', 63.00, 15, 945.00, 72.3, 75.25, 40.98, 30.33, 4.12, 722.02),
(54, 1, 200006, '2024-04-28', 63.00, 15, 945.00, 72.3, 75.25, 40.98, 0.00, 4.12, 752.35),
(55, 3, 200001, '2024-04-28', 47.25, 22.5, 1063.13, 81.34, 89.42, 47.48, 35.24, 4.57, 805.08),
(56, 3, 200003, '2024-04-28', 47.25, 22.5, 1063.13, 81.34, 89.42, 47.48, 35.24, 4.57, 805.08),
(57, 3, 200004, '2024-04-28', 47.25, 22.5, 1063.13, 81.34, 89.42, 47.48, 35.24, 4.57, 805.08),
(58, 3, 200006, '2024-04-28', 47.25, 22.5, 1063.13, 81.34, 89.42, 47.48, 0.00, 4.57, 840.32);


INSERT INTO officialprojects (
  project_id,
  contractor,
  streetaddress,
  city, 
  zipcode, 
  startdate,
  enddate,
  projectname,
  total_netpayroll,
  total_taxowed,
  total_projectexpenses,
)
VALUES 
(
  3, 
  'Brightcore Energy', 
  '2707 Albemarle Rd', 
  'Brooklyn', 
  '11226', 
  '2024-04-11',
  NULL, 
  'DOE G7-K399', 
  NULL, 
  NULL, 
  NULL
);

UPDATE officialprojectprinfo
SET payrollfee = 0.0
WHERE projectpayrollid = 1; 

ALTER TABLE officialpayrollinfo
ALTER COLUMN totalhours
TYPE DECIMAL(3, 1);

DELETE FROM officialpayrollsubmission WHERE project_id=2;

SELECT * FROM officialpayrollsubmission ORDER BY paysub_id ASC;

ALTER TABLE officialprojectprinfo ADD COLUMN payperiod DATE;

ALTER TABLE table_name RENAME COLUMN old_name TO new_name;