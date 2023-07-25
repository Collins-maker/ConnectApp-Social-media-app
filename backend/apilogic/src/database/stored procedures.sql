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
    @email_adress VARCHAR(50),
    @password VARCHAR(100)
AS
BEGIN
    
    DECLARE @user_id INT;
    SELECT @user_id = ISNULL(MAX(user_id),0)+ 1 FROM users.userProfile;


    INSERT INTO users.userProfile (first_name,last_name,username,email_address, Password)
    VALUES (@first_name, @last_name,@username,,@email_adress,@password);
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
	@user_id INT,
    @gender VARCHAR(30),
    @country VARCHAR(255),
    @phone_number VARCHAR(255),
    @date_of_birth VARCHAR(255),
    @profile_image VARCHAR(1000),
    @bio_data VARCHAR(MAX)
AS
BEGIN
    UPDATE users.userProfile
    SET gender = @gender,country=@country,phone_number=@phone_number,date_of_birth=@date_of_birth,profile_image=@profile_image,bio_data=@bio_data
    WHERE user_id= @user_id;
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

--DELETE FROM  users.userProfile
--WHERE username = 'Mtumishi'

--select * from users.userProfile

--DELETE FROM  posts.postTable
--WHERE user_id = 5

--select * from posts.postTable



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

CREATE OR ALTER PROCEDURE getUserByUserId
    @user_id VARCHAR(30)
AS
BEGIN
    SELECT *
    FROM users.userProfile
    WHERE user_id = @user_id;
END;

EXEC getUserByUserId @user_id = 4



-- Get user posts
CREATE OR ALTER PROCEDURE getUserPosts
    @user_id INT
AS
BEGIN
    SELECT *
    FROM posts.postTable
    WHERE user_id = @user_id;
END;

--needs modification
CREATE OR ALTER PROCEDURE getUserFollowers
@username VARCHAR

AS 
BEGIN

SELECT username FROM users.userProfile 
WHERE username=@username;

END;

EXEC getUserByUsername 'Mtumishi'

CREATE OR ALTER PROCEDURE follow
@user_id INT,
@following_id INT 
AS
BEGIN
INSERT INTO  users.followTable(user_id,following_id)
VALUES (@user_id, @following_id);
END;

--EXEC follow @user_id = 56, @following_id = 55

SELECT * FROM users.followTable

select * from notifications.notificationTable

select * from users.userProfile

--POST  PROCEDURES...


-- Insert Post
-- Insert Post
CREATE OR ALTER PROCEDURE insertPost
    @user_id INT,
    @written_text VARCHAR(255),
    @media_url VARCHAR(255),
    @media_type VARCHAR(255)
AS
BEGIN
DECLARE @post_id INT;

 SELECT @post_id = ISNULL(MAX(post_id),0)+ 1 FROM posts.postTable;
    INSERT INTO posts.postTable (user_id, written_text, media_url, media_type)
    VALUES (@user_id, @written_text, @media_url, @media_type);
END;

select * from posts.postTable;

-- Update Post
CREATE OR ALTER PROCEDURE updatePost
    @post_id INT,
    @written_text VARCHAR(1000),
    @media_url VARCHAR(1000),
    @media_type VARCHAR(1000)
AS
BEGIN
    UPDATE posts.postTable
    SET written_text = @written_text, media_url = @media_url, media_type = @media_type
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
CREATE  OR ALTER PROCEDURE getPostByID
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
    SELECT p.*, u.profile_image, u.username
    FROM posts.postTable p
    JOIN users.userProfile u ON p.user_id = u.user_id
    WHERE p.is_deleted = 0;
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

EXEC posts.likePost @post_id=9, @user_id=4;

select * from posts.likeTable

SELECT * FROM posts.postTable


 (19,1),
    (18,7),
    (19,7),
    (20,6),
    (21,2),
    (22,2),
    (23,1);


    ---Insert comments:
    CREATE OR ALTER PROCEDURE insertComment
  @user_id INT,
  @post_id INT,
  @comment_text VARCHAR(1000)
AS
BEGIN
  SET NOCOUNT ON;

  INSERT INTO posts.commentsTable (user_id, post_id, Comment_Text)
  VALUES (@user_id, @post_id, @comment_text);
END

EXEC insertComment @user_id =32,@post_id =1,@comment_text ='I dont believe!';
SELECT * FROM posts.postTable

SELECT * FROM posts.commentsTable
SELECT * from notifications.notificationTable

--GETTING ALL comments for a specific post
CREATE OR ALTER PROCEDURE getAllPostComment
@post_id INT
AS
BEGIN
SELECT * from posts.commentsTable
WHERE post_id = @post_id
END

--EXEC getAllPostComment 40;

--SELECT * FROM posts.postTable
--SELECT * FROM posts.CommentTable

SELECT * FROM users.userProfile

--replying to a comment
CREATE OR ALTER PROCEDURE insertCommentReply
@replied_by_id INT,
@comment_id INT,
@reply_text VARCHAR(1000)
AS
BEGIN
INSERT INTO posts.repliesTable(replied_by_id,comment_id,reply_text)
VALUES(@replied_by_id,@comment_id,@reply_text)
END;

SELECT * FROM posts.commentsTable
SELECT * FROM posts.repliesTable

EXEC insertCommentReply 4,5, 'Baraka Childrens Home'
