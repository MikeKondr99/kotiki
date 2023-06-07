DROP TABLE IF EXISTS cats;
CREATE TABLE IF NOT EXISTS cats (
    id SERIAL PRIMARY KEY,
    name varchar(50) NOT NULL,
    age integer NOT NULL,
    color VARCHAR(50) NOT NULL,
    sex VARCHAR(1) NOT NULL,
    image VARCHAR(200) DEFAULT NULL,
    breed VARCHAR(50) DEFAULT NULL,
    sterilized BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO cats
(name,age,color,sex,breed,sterilized) VALUES
('A',10,'red'  ,'M' ,NULL ,false),
('B',9 ,'green','F' ,NULL ,false),
('C',8 ,'green','M', NULL,true),
('D',7 ,'blue' ,'F' ,NULL ,false),
('E',6 ,'red'  ,'M' ,NULL ,true),
('F',5 ,'green','F' ,NULL ,true),
('G',3 ,'blue' ,'M' ,NULL ,false),
('H',3 ,'red'  ,'F' ,NULL ,false),
('I',2 ,'blue' ,'M' ,NULL ,true),
('J',8 ,'green','F' ,NULL ,true),
('K',17,'RGB'  ,'F' ,NULL ,true),
('L',1 ,'RGB'  ,'F' ,NULL ,false),
('M',0 ,'RGB'  ,'M' ,NULL ,false),
('N',5 ,'RGB'  ,'M' ,NULL ,false);
