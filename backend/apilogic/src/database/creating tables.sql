CREATE DATABASE ConnectApp;

USE ConnectApp;

CREATE SCHEMA users;
CREATE SCHEMA posts;
CREATE SCHEMA notifications;

CREATE TABLE users.userProfile(
   user_id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255),
   username VARCHAR(30) UNIQUE,
   gender VARCHAR(30),
   email_address VARCHAR(50) UNIQUE,
   country VARCHAR(255),
   phone_number VARCHAR(255) NOT NULL,
   date_of_birth VARCHAR(255) NOT NULL,
   registration_date DATETIME NOT NULL DEFAULT GETDATE(),
   image_url VARCHAR(1000),
   bio_data VARCHAR(MAX),
   age AS (DATEDIFF(YEAR, date_of_birth, GETDATE())),
   followers INT,
   followings INT,
   posts INT,
   password VARCHAR (100) NOT NULL,
   is_deleted BIT NOT NULL DEFAULT 0
);



--check the results

SELECT * FROM users.userProfile





CREATE TABLE users.followTable(
  follow_id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
  user_id INT FOREIGN KEY REFERENCES users.userProfile(user_id) ,
  following_id INT FOREIGN KEY REFERENCES users.userProfile(user_id) ,
  created_at DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE posts.postTable(
    post_id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    user_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
    written_text VARCHAR (1000),
    image_url VARCHAR(255),
    video_url VARCHAR(255),
    like_count VARCHAR(255),
    Comment_count VARCHAR(255),
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);


CREATE TABLE posts.likeTable(
    like_id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    post_id INT FOREIGN KEY REFERENCES posts.postTable(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id INT FOREIGN KEY REFERENCES users.userProfile(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	is_like BIT,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);



SELECT * FROM posts.likeTable 



CREATE TABLE posts.commentsTable(
    comment_id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    user_id INT FOREIGN KEY REFERENCES users.userProfile(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    post_id INT FOREIGN KEY REFERENCES posts.postTable(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
    Comment_Text VARCHAR(1000),
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);



CREATE TABLE posts.repliesTable(
    reply_id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    replied_by_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
    comment_id INT FOREIGN KEY REFERENCES posts.commentsTable(Comment_id)  ON DELETE CASCADE ON UPDATE CASCADE,
    reply_text VARCHAR(1000),
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

SELECT * FROM posts.repliesTable
DROP TABLE posts.repliesTable

CREATE TABLE notifications.notificationTable(
    notify_id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    user_id INT FOREIGN KEY REFERENCES users.userProfile(user_id)  ON DELETE CASCADE ON UPDATE CASCADE,
    notification_type VARCHAR(255),
    post_id INT FOREIGN KEY REFERENCES posts.postTable(post_id),
    sender_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
    is_read BIT,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

--not implemented

CREATE TABLE chat.messagesTable(
    message_id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    chat_id INT FOREIGN KEY REFERENCES chat.chatsTable(chat_id),
    sender_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
    receiver_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
    message_content VARCHAR (1000),
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

