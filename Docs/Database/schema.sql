CREATE TABLE USERS(
        id  INTEGER PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        user_password VARCHAR(200) NOT NULL
    );


CREATE TABLE USER_TV(
   id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
   id_tv INTEGER NOT NULL,
   userId INTEGER NOT NULL,
   backdrop_path VARCHAR(255),
   media_type VARCHAR(20),
   first_air_date DATE,
   vote_average FLOAT,
   tv_name VARCHAR(200) NOT NULL,
   overview TEXT NOT NULL,
   FOREIGN KEY (userId) REFERENCES users(id)
   ON DELETE CASCADE
);

CREATE TABLE USER_MOVIE(
   id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
   id_movie INTEGER NOT NULL,
   userId INTEGER NOT NULL,
   backdrop_path VARCHAR(255),
   media_type VARCHAR(20),
   release_date DATE,
   vote_average FLOAT,
   title VARCHAR(200) NOT NULL,
   overview TEXT NOT NULL,
   FOREIGN KEY (userId) REFERENCES users(id)
   ON DELETE CASCADE
);