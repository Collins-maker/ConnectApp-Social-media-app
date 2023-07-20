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