--stored procedures

--userProfile stored procedures
CREATE OR ALTER PROCEDURE getAllUsers
 AS
 BEGIN

 SELECT * FROM users.userProfile
 WHERE is_deleted=0;
END;

EXEC getAllusers
 
-- Insert user
CREATE OR ALTER PROCEDURE insertUser
    @first_name VARCHAR(255),
    @last_name VARCHAR(255),
	@username VARCHAR(50),
    @gender VARCHAR(50),
    @email VARCHAR(50),
    @country VARCHAR(255),
    @phone_number VARCHAR(255),
    @date_of_birth VARCHAR(50),
    @password VARCHAR(100)
AS
BEGIN
    
    DECLARE @user_id INT;
    SELECT @user_id = ISNULL(MAX(user_id),0)+ 1 FROM users.userProfile;


    INSERT INTO users.userProfile (first_name,last_name,username,gender, email_address,country,phone_number,date_of_birth, Password)
    VALUES (@first_name, @last_name,@username, @gender,@email,@country,@phone_number,@date_of_birth,@password);
END;

--EXEC insertUser
@first_name ='Chris',@last_name='Sumba',@username='Tsumba', @gender='Male' ,@email='chris@gmail.com',@country='Kenya',@phone_number='0712345678',@date_of_birth='2002-01-01',@password='12345677';

--SELECT * FROM users.userProfile


CREATE OR ALTER PROCEDURE getAllUsers
AS 
BEGIN
SELECT * FROM users.userProfile 
WHERE is_deleted = 0;
END;



-- Update user
CREATE OR ALTER PROCEDURE updateUser
    @first_name VARCHAR(50),
    @last_name VARCHAR(255),
    @username VARCHAR(255),
    @email VARCHAR(50)
AS
BEGIN
    UPDATE users.userProfile
    SET first_name = @first_name,last_name=@last_name,email_address = @email
    WHERE username = @username;
END;

-- Delete user
CREATE OR ALTER PROCEDURE deleteUser
    @username VARCHAR(30)
AS
BEGIN
    Update users.userProfile
    SET is_deleted=1
    WHERE username = @username;
END;

-- Get user By usename
CREATE OR ALTER PROCEDURE getUserByUsername
    @username VARCHAR(30)
AS
BEGIN
    SELECT *
    FROM users.userProfile
    WHERE username = @username;
END;

--EXEC getUserByUsername @username='Mtumishi'


-- Get user posts
CREATE OR ALTER PROCEDURE getUserPosts
    @user_id INT
AS
BEGIN
    SELECT *
    FROM posts.postTable
    WHERE user_id = @user_id;
END;


CREATE OR ALTER PROCEDURE getUserFollowers
@user_id INT

AS 
BEGIN

SELECT followers FROM users.userProfile 
WHERE user_id=@user_id;

END;

--POST  PROCEDURES
-- Insert Post
CREATE OR ALTER PROCEDURE insertPost
    @user_id INT,
    @written_text VARCHAR(255),
    @image_url VARCHAR(255),
    @video_url VARCHAR(255)
AS
BEGIN
DECLARE @post_id INT;

 SELECT @post_id = ISNULL(MAX(post_id),0)+ 1 FROM posts.postTable;
    INSERT INTO posts.postTable (user_id, written_text, image_url, video_url)
    VALUES (@user_id, @written_text, @image_url, @video_url);
END;

select * from posts.postTable;

-- Update Post
CREATE OR ALTER PROCEDURE updatePost
    @post_id INT,
    @written_text VARCHAR(255),
    @image_url VARCHAR(255),
    @video_url VARCHAR(255)
AS
BEGIN
    UPDATE posts.postTable
    SET written_text = @written_text, image_url = @image_url, video_url = @video_url
    WHERE post_id = @post_id;
END;

EXEC updatePost
25,'have changed','ejehehrh','qqqqqqq';


-- Delete Post
CREATE OR ALTER PROCEDURE deletePost
    @post_id INT
AS
BEGIN
    Update posts.postTable
    SET is_deleted=1
    WHERE post_id = @post_id;
END;

--EXEC DeletePost
17

-- Get Post By ID
CREATE PROCEDURE getPostByID
    @post_id INT
AS
BEGIN
    SELECT *
    FROM posts.postTable
    WHERE post_id = @post_id;
END;

--get all posts
CREATE OR ALTER PROCEDURE getAllPosts
AS
BEGIN
SELECT * FROM  posts.postTable
WHERE is_deleted = 0
END;

-- Get user posts
CREATE OR ALTER PROCEDURE getUserPosts
    @user_id INT
AS
BEGIN
    SELECT *
    FROM posts.postTable
    WHERE user_id = @user_id;
END;

-- Get Feed posts
CREATE or alter PROCEDURE getFeedposts
    @user_id INT
AS
BEGIN
    SELECT p.*
    FROM posts.postTable p
    INNER JOIN users.followTable f ON p.user_id = f.user_id
    WHERE f.following_id = @user_id;
END;

EXEC getFeedposts 7

select * from users.followTable

---like 
CREATE OR ALTER PROCEDURE posts.likePost
    @user_id INT,
    @post_id INT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @is_liked BIT;
    
    -- Check if the user has already liked the post
    SELECT @is_liked = is_like
    FROM posts.likeTable
    WHERE user_id = @user_id AND post_id = @post_id;
    
    -- If the user has already liked the post, perform unlike action
    IF @is_liked = 1
    BEGIN
        -- Unlike the post
        UPDATE posts.likeTable
        SET is_like = 0
        WHERE user_id = @user_id AND post_id = @post_id;
        
        PRINT 'Post unliked.';
    END
    ELSE
    BEGIN
        -- Like the post
        INSERT INTO posts.likeTable (post_id, user_id, is_like, created_at)
        VALUES (@post_id, @user_id, 1, GETDATE());
        
        PRINT 'Post liked.';
    END
END;

EXEC posts.likePost @post_id=18, @user_id=7;

select * from posts.likeTable

SELECT * FROM posts.postTable


 (19,1),
    (18,7),
    (19,7),
    (20,6),
    (21,2),
    (22,2),
    (23,1);