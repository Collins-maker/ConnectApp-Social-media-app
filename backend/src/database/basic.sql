CREATE DATABASE ConnectApp;

USE ConnectApp;

CREATE SCHEMA users;
CREATE SCHEMA posts;
CREATE SCHEMA notifications;
CREATE SCHEMA chat;

CREATE TABLE users.userProfile(
   user_id INT PRIMARY KEY NOT NULL,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255),
   username VARCHAR(30) UNIQUE,
   Gender VARCHAR(30),
   email_address VARCHAR(50) UNIQUE,
   Country VARCHAR(255),
   phone_number VARCHAR(255) NOT NULL,
   date_of_birth VARCHAR(255) NOT NULL,
   registration_date DATETIME NOT NULL DEFAULT GETDATE(),
   image_url VARCHAR(1000),
   bio_data VARCHAR(MAX),
   age AS (DATEDIFF(YEAR, date_of_birth, GETDATE())),
   followers INT,
   followings INT,
   posts INT
);


CREATE TABLE users.followTable(
  follow_id INT PRIMARY KEY NOT NULL,
  user_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
  following_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
  created_at VARCHAR(255)
);

CREATE TABLE posts.postTable(
    post_id INT PRIMARY KEY NOT NULL,
    user_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
    written_text VARCHAR (1000),
    image_url VARCHAR(255),
    video_url VARCHAR(255),
    like_count VARCHAR(255),
    Comment_count VARCHAR(255),
    created_at VARCHAR(255)
);

CREATE TABLE posts.likeTable(
    like_id INT PRIMARY KEY NOT NULL,
    post_id INT FOREIGN KEY REFERENCES posts.postTable(post_id),
    user_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
    created_at VARCHAR(255)
);

CREATE TABLE posts.commentsTable(
    comment_id INT PRIMARY KEY NOT NULL,
    user_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
    post_id INT FOREIGN KEY REFERENCES posts.postTable(post_id),
    Comment_Text VARCHAR(1000),
    created_at VARCHAR(255)
);

CREATE TABLE posts.repliesTable(
    Reply_id INT PRIMARY KEY NOT NULL,
    Replied_by_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
    comment_id INT FOREIGN KEY REFERENCES posts.commentsTable(Comment_id),
    Reply_text VARCHAR(1000),
    created_at VARCHAR(255)
);

CREATE TABLE chat.chatsTable(
 chat_id INT PRIMARY KEY NOT NULL,
 created_at VARCHAR(255)
);

CREATE TABLE chat.messagesTable(
    message_id INT PRIMARY KEY NOT NULL,
    chat_id INT FOREIGN KEY REFERENCES chat.chatsTable(chat_id),
    sender_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
    receiver_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
    message_content VARCHAR (1000),
    created_at VARCHAR(255)
);

CREATE TABLE notifications.notificationTable(
    notify_id INT PRIMARY KEY NOT NULL,
    user_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
    notification_type VARCHAR(255),
    post_id INT FOREIGN KEY REFERENCES posts.postTable(post_id),
    sender_id INT FOREIGN KEY REFERENCES users.userProfile(user_id),
    is_read BIT,
    created_at VARCHAR(255)
);
GO;

INSERT INTO users.userProfile (user_id,first_name, Surname, Gender, email_address, Country, phone_number, date_of_birth, Password)
VALUES
    (100,'John', 'Doe', 'Male', 'johndoe@example.com', 'USA', '1234567890', '1990-01-01', 'password123'),
    (101,'Jane', 'Smith', 'Female', 'janesmith@example.com', 'Canada', '9876543210', '1992-05-15', 'securepass'),
    (102,'Mike', 'Johnson', 'Male', 'mikejohnson@example.com', 'Australia', '5555555555', '1985-12-10', 'mypassword'),
    (103,'Emily', 'Brown', 'Female', 'emilybrown@example.com', 'UK', '7777777777', '1988-09-20', 'password1234'),
    (104,'David', 'Wilson', 'Male', 'davidwilson@example.com', 'Germany', '4444444444', '1995-06-25', 'strongpass');


INSERT INTO posts.postTable (user_id, written_text, image_url, video_url)
VALUES
    (1, 'Beautiful sunset', 'https://example.com/images/sunset.jpg', ''),
    (2, 'Delicious meal', 'https://example.com/images/meal.jpg', '',),
    (102, 'Fun day at the beach', 'https://example.com/images/beach.jpg', 'https://example.com/videos/beach.mp4'),
    (103, 'Amazing view from the mountaintop', 'https://example.com/images/mountain.jpg', ''),
    (104, 'Cute puppy', 'https://example.com/images/puppy.jpg', 'https://example.com/videos/puppy.mp4');



INSERT INTO users.followTable (user_id, following_id)
VALUES
    
    (1, 2),
    (2, 1);

-- Dummy data for comments table
INSERT INTO posts.commentsTable (user_id, post_id, Comment_text)
VALUES
    (1, 1, 'Beautiful photo!'),
    (2, 1, 'I love sunsets.'),
    (3, 2, 'That looks delicious!'),
    (4, 3, 'Wish I was there!'),
    (5, 4, 'Breathtaking view.'),
    (6, 4, 'I want to go there!'),
    (7, 5, 'Aww, such a cute puppy!');


-- Dummy data for likes table
INSERT INTO posts.likeTable (post_id, user_id)
VALUES
    (1, 2),
    (1, 3),
    (2, 1),
    (3, 4),
    (4, 2),
    (4, 3),
    (5, 1);


select * from users.followTable
select * from posts.commentsTable;
select * from posts.likeTable;
ALTER TABLE users.userProfile
ADD Age AS (DATEDIFF(YEAR, date_of_birth, GETDATE()));

ALTER TABLE users.userProfile ADD Password VARCHAR(255);
SELECT * FROM users.userProfile;

ALTER TABLE users.userProfile
ADD is_deleted BIT NOT NULL DEFAULT 0;


ALTER TABLE posts.postTable ADD Like_count VARCHAR(255), Comment_Count VARCHAR(255);
SELECT * FROM posts.postTable;

GO;

--views
CREATE VIEW posts.post_details AS
SELECT
    p.post_id,
    p.user_id,
    u.Surname,
    p.written_text,
    p.image_url,
    p.video_url,

    COUNT(DISTINCT c.Comment_id) AS Comment_count,
    COUNT(DISTINCT l.Like_id) AS Like_count
FROM
    posts.postTable p
    LEFT JOIN users.userProfile u ON p.user_id = u.user_id
    LEFT JOIN posts.commentsTable c ON p.post_id = c.post_id
    LEFT JOIN posts.likeTable l ON p.post_id = l.post_id
GROUP BY
    p.post_id,
    p.user_id,
    u.Surname,
    p.written_text,
    p.image_url,
    p.video_url;

    GO;

    SELECT * FROM posts.post_details;

GO;

--triggers

CREATE TRIGGER posts.updatePost
ON posts.postTable
AFTER INSERT, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    -- Update the post count for the user
    UPDATE users.userProfile
    SET post_count= (SELECT COUNT(*) FROM posts.postTable WHERE user_id IN (SELECT user_id FROM INSERTED))
    WHERE user_id IN (SELECT user_id FROM INSERTED);
END;

GO;

CREATE TRIGGER posts.updateLike
ON posts.likeTable
AFTER INSERT, DELETE 
AS
BEGIN
    -- Update the like count for the post
    SET NOCOUNT ON
    UPDATE posts.postTable
    SET Like_count = (SELECT COUNT(*) FROM posts.likeTable WHERE post_id IN (SELECT post_id FROM inserted))
    WHERE post_id  IN (SELECT post_id FROM inserted);
END;

GO;

CREATE TRIGGER posts.updateComments
ON posts.commentsTable
AFTER INSERT, DELETE 
AS
BEGIN
    -- Update the like count for the post
    SET NOCOUNT ON
    UPDATE posts.postTable
    SET Comment_Count = (SELECT COUNT(*) FROM posts.CommentsTable WHERE post_id IN (SELECT post_id FROM inserted))
    WHERE post_id  IN (SELECT post_id FROM inserted);
END;

GO;

CREATE TRIGGER users.updateFollowerCount
ON users.followTable
AFTER INSERT, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    -- Update the follower count for the user being followed
    UPDATE u
    SET followers = (SELECT COUNT(*) FROM users.followTable WHERE user_id = u.user_id)
    FROM users.userProfile u
    INNER JOIN INSERTED i ON u.user_id = i.user_id;

    -- Update the following count for the user who is following
    UPDATE u
    SET following = (SELECT COUNT(*) FROM users.followTable WHERE user_id = u.user_id)
    FROM userProfile u
    INNER JOIN INSERTED i ON u.user_id = i.following_id;
END;

SELECT * FROM users.userProfile;

Go;
--stored procedures

--user related stored procedures
CREATE OR ALTER PROCEDURE getAllusers
 AS
 BEGIN

 SELECT * FROM users.userProfile
 WHERE is_deleted=0;
END;
 GO;
-- Insert user
CREATE OR ALTER PROCEDURE Insertuser
    @FirstName VARCHAR(255),
    @Surname VARCHAR(255),
    @Gender VARCHAR(50),
    @email VARCHAR(50),
    @country VARCHAR(255),
    @phone_number VARCHAR(255),
    @DateOfBirth VARCHAR(50),
    @password VARCHAR(50)
AS
BEGIN
    
    DECLARE @user_id INT;
    SELECT @user_id = ISNULL(MAX(user_id),0)+ 1 FROM users.userProfile;


    INSERT INTO users.userProfile (first_name,Surname,Gender, email_address,Country,phone_number,date_of_birth, Password)
    VALUES (@FirstName, @Surname, @Gender,@email,@country,@phone_number,@DateOfBirth,@password);
END;
GO;

-- Update user
CREATE OR ALTER PROCEDURE Updateuser
    @user_id INT,
    @FirstName VARCHAR(50),
    @surname VARCHAR(255),
    @email VARCHAR(50)
AS
BEGIN
    UPDATE users.userProfile
    SET first_name = @FirstName,Surname=@surname,email_address = @email
    WHERE user_id = @user_id;
END;

GO;
-- Delete user
CREATE OR ALTER PROCEDURE Deleteuser
    @user_id INT
AS
BEGIN
    Update users.userProfile
    SET is_deleted=1
    WHERE user_id = @user_id;
END;

GO;
-- Get user By ID
CREATE OR ALTER PROCEDURE GetuserByID
    @user_id INT
AS
BEGIN
    SELECT *
    FROM users.userProfile
    WHERE user_id = @user_id;
END;
GO;

-- Get user posts
CREATE PROCEDURE Getuserposts
    @user_id INT
AS
BEGIN
    SELECT *
    FROM posts.postTable
    WHERE user_id = @user_id;
END;

GO;

CREATE OR ALTER PROCEDURE getuserFollowers
@user_id INT

AS 
BEGIN

SELECT followers FROM users.userProfile 
WHERE user_id=@user_id;

END;
GO;

--POST RELATED PROCEDURES
-- Insert Post
CREATE OR ALTER PROCEDURE InsertPost
    @user_id INT,
    @written_text VARCHAR(255),
    @image_url VARCHAR(255),
    @video_url VARCHAR(255)
AS
BEGIN
DECLARE @post_id INT;

 SELECT @post_id = ISNULL(MAX(post_id),0)+ 1 FROM posts.postTable;
    INSERT INTO posts.postTable (user_id, written_text, image_url, video_url)
    VALUES (@user_id, @caption, @image_url, @video_url);
END;

select * from posts.postTable;

-- Update Post
CREATE PROCEDURE UpdatePost
    @post_id INT,
    @caption VARCHAR(255),
    @image_url VARCHAR(255),
    @video_url VARCHAR(255)
AS
BEGIN
    UPDATE posts
    SET caption = @caption, image_url = @image_url, video_url = @video_url
    WHERE post_id = @post_id;
END;

-- Delete Post
CREATE PROCEDURE DeletePost
    @post_id INT
AS
BEGIN
    DELETE FROM posts
    WHERE post_id = @post_id;
END;

-- Get Post By ID
CREATE PROCEDURE GetPostByID
    @post_id INT
AS
BEGIN
    SELECT *
    FROM posts
    WHERE post_id = @post_id;
END;

-- Get user posts
CREATE PROCEDURE Getuserposts
    @user_id INT
AS
BEGIN
    SELECT *
    FROM posts
    WHERE user_id = @user_id;
END;

-- Get Feed posts
CREATE PROCEDURE GetFeedposts
    @user_id INT
AS
BEGIN
    SELECT p.*
    FROM posts p
    INNER JOIN followers f ON p.user_id = f.followed_id
    WHERE f.follower_id = @user_id;
END;