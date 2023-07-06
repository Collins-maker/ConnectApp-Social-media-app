--triggers

CREATE OR ALTER TRIGGER posts.updatePost
ON posts.postTable
AFTER INSERT, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    -- Update the post count for all users
    UPDATE users.userProfile
    SET posts = (
        SELECT COUNT(*) 
        FROM posts.postTable 
        WHERE user_id = users.userProfile.user_id
    );
END;

--SELECT * FROM posts.postTable;
--SELECT * FROM users.userProfile


CREATE OR ALTER TRIGGER posts.updateLike
ON posts.likeTable
AFTER INSERT, DELETE 
AS
BEGIN
    -- Update the like count for the post
    SET NOCOUNT ON;
    
    UPDATE posts.postTable
    SET Like_count = (
        SELECT COUNT(*) 
        FROM posts.likeTable
        WHERE post_id = posts.postTable.post_id
        AND is_like = 1
    );
END;




CREATE OR ALTER TRIGGER posts.updateComments
ON posts.commentsTable
AFTER INSERT, DELETE 
AS
BEGIN
    -- Update the like count for the post
    SET NOCOUNT ON
    UPDATE posts.postTable
    SET Comment_Count = (
	SELECT COUNT(*) 
	FROM posts.CommentsTable 
	WHERE post_id = posts.postTable.post_id
	);
END;


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
    SET followings = (SELECT COUNT(*) FROM users.followTable WHERE user_id = u.user_id)
    FROM userProfile u
    INNER JOIN INSERTED i ON u.user_id = i.following_id;
END;

SELECT * FROM users.userProfile;

--trigger to handle change of foreign keys in comment replies table
CREATE TRIGGER tr_Delete_User
ON users.userProfile
AFTER DELETE
AS
BEGIN
    DELETE FROM posts.repliesTable
    WHERE Replied_by_id IN (SELECT user_id FROM deleted);
END;
GO

CREATE TRIGGER tr_Update_User
ON users.userProfile
AFTER UPDATE
AS
BEGIN
    UPDATE posts.repliesTable
    SET Replied_by_id = inserted.user_id
    FROM posts.repliesTable
    INNER JOIN deleted ON repliesTable.Replied_by_id = deleted.user_id
    INNER JOIN inserted ON deleted.user_id = inserted.user_id;
END;
GO

