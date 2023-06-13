
DROP TABLE IF EXISTS cats;
CREATE TABLE IF NOT EXISTS cats (
    id SERIAL PRIMARY KEY,
    name varchar(50) NOT NULL,
    age integer NOT NULL,
    color VARCHAR(50) NOT NULL,
    sex VARCHAR(1) NOT NULL,
    image VARCHAR(200) NOT NULL DEFAULT '',
    breed VARCHAR(50) NOT NULL DEFAULT '',
    description VARCHAR(500) NOT NULL DEFAULT '',
    sterilized BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO cats
(name,age,color,description,image,sex,breed,sterilized) VALUES
('Грозный',6 ,'серый'        , 'Не очень то он и грозный'               ,'https://s0.rbk.ru/v6_top_pics/media/img/4/99/756723917919994.webp', 'M' ,'' ,true ),
('Дагира' ,5 ,'бело-злой'    , 'SCP-████'                               ,'https://aif-s3.aif.ru/images/030/685/69b8b8a10a50eee876a14e2b7fbe87e6.JPG','F' ,'' ,false),
('Лилия'  ,17,'серый'        , 'Посмотри НТВ и будет выглядеть не лучше','https://cdn-static.ntv.ru/home/news/2021/20210715/8-kot_vs.jpg','F' ,'' ,true),
('Мята'   ,1 ,'рыжий'        , ''                                     ,'https://n1s1.hsmedia.ru/52/bf/10/52bf10fa9b1bc38201a057cd73bb2405/728x437_1_cae8ffe75f14be347b10fbf78eea4474@1920x1152_0xac120003_2968388821647266783.jpeg','F' ,'' ,false),
('Савик'  ,9 ,'чёрный'       , ''                                     ,'https://cs14.pikabu.ru/post_img/big/2023/02/03/5/1675406272129042878.png', 'M' ,'' ,false),
('Салли'  ,5 ,'серый'        , ''                                     ,'', 'F' ,'' ,true ),
('Хован'  ,10,'рыжий'        , ''                                     ,'https://4lapy.ru/resize/1664x1000/upload/medialibrary/270/2703fd71a17c0843c0b91bbe28c4fe0f.jpg', 'M' ,'' ,false),
('Микки'  ,3 ,'рыже-серый'   , 'Ему 3 года                              , а он уже тигр','https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg','F' ,'' ,false),
('Мерелин',2 ,'чёрно-белый'  , ''                                     ,'https://img.gazeta.ru/files3/34/14989034/59051691-10915089-image-m-34_165-pic_32ratio_600x400-600x400-44970.jpg','F' ,'енот' ,true),
('Марио'  ,7 ,'серый'        , 'it`s me Mario'                          ,'https://cs.pikabu.ru/post_img/big/2013/07/07/1/1373146930_1810460069.jpg', 'M' ,'' ,false),
('Тишка'  ,3 ,'серый'        , ''                                     ,'https://cdnn21.img.ria.ru/images/07e4/0c/0a/1588644193_0:321:3071:2048_1920x0_80_0_0_fee132516d8e1dc34b87ff087c071453.jpg', 'M' ,'' ,false),
('Федор'  ,8 ,'серый'        , ''                                     ,'https://zoohub.ua/files/resized/blog/kot.1100x600.jpeg', 'M', '' ,true ),
('Шпулька',8 ,'серый'        , ''                                     ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0FPXytzIP72byjfCgQt_M-X0xNx7LRf9eLQ&usqp=CAU','F' ,'' ,true),
('Майа'   ,0 ,'чёрно-белый'  , ''                                     ,'https://images11.graziamagazine.ru/upload/img_cache/235/235f45a5b6ea325a095fb7de29557fe9_cropped_666x665.jpg','F' ,'' ,false);