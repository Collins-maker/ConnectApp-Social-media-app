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


----new bwgining


--notifcations trigger,
--notifying after comment:
CREATE  OR ALTER TRIGGER commentPostTrigger
ON posts.commentsTable
AFTER INSERT
AS
BEGIN
  SET NOCOUNT ON;

  -- Declare variables for user ID, post ID, sender ID, and notification type
  DECLARE @user_id INT;
  DECLARE @post_id INT;
  DECLARE @sender_id INT;
  DECLARE @notification_type VARCHAR(MAX);

  -- Retrieve the commented user ID and post ID from the inserted table
  SELECT @user_id = user_id, @post_id = post_id
  FROM inserted;

  -- Retrieve the name of the commented user
  DECLARE @commentedUserName VARCHAR(255);
  SELECT @commentedUserName = u.username
  FROM users.userProfile AS u
  WHERE u.user_id = @user_id;

  -- Get the user ID of the post owner from the posts table
  DECLARE @post_user_id INT;
  SELECT @post_user_id = user_id
  FROM posts.postTable
  WHERE post_id = @post_id;

  -- Get the sender ID from the user's table (replace with your actual sender ID retrieval logic)
  SET @sender_id = @user_id;

  -- Create a notification type
  SET @notification_type = CONCAT(@commentedUserName, ' commented on your post');

  -- Insert the notification into the notifications table
  INSERT INTO notifications.notificationTable(user_id, post_id, sender_id, notification_type)
  VALUES (@post_user_id, @post_id, @sender_id, @notification_type);
END;





--notifications triggers
CREATE OR ALTER TRIGGER commentPostTrigger
ON posts.commentsTable
AFTER INSERT
AS
BEGIN
  SET NOCOUNT ON;

  DECLARE @user_id INT;
  DECLARE @post_id INT;
  DECLARE @notification_type VARCHAR(MAX);

 

  -- Retrieve the commented user ID and post ID
  SELECT @user_id = c.user_id, @post_id = c.post_id
  FROM posts.commentsTable AS c
  WHERE c.user_id = (SELECT user_id FROM inserted);

 

  -- Retrieve the name of the commented user
  DECLARE @commentedUserName VARCHAR(255);
  SELECT @commentedUserName = u.username
  FROM users.userProfile AS u
  WHERE u.user_id = @user_id;

 

  -- Create a notification notification_type
  SET @notification_type = CONCAT(@commentedUserName, ' commented on your post');

 

  -- Insert a new row in the Notifications table
  INSERT INTO Notifications (user_id, sender_id, notification_type)
  SELECT p.user_id, @user_id, @notification_type
  FROM posts.postTable AS p
  WHERE p.post_id = @post_id;
END;


CREATE TRIGGER folowPostTrigger

ON users.followTable

AFTER INSERT

AS

BEGIN

  SET NOCOUNT ON;

 

  DECLARE @post_id INT;

  DECLARE @following_id INT;

 

  -- Retrieve the post ID

  SELECT @post_id = post_id FROM inserted;

 

  -- Get the follower user IDs and names

  DECLARE @followings TABLE (following_id INT, followingName VARCHAR(255));

  INSERT INTO @followings (following_id, followingName)

  SELECT f.following_id, u.username

  FROM Follow AS f

  INNER JOIN Users AS u ON u.id = f.following_id

  WHERE f.user_id = (SELECT user_id FROM Posts WHERE id = @post_id);

 

  -- Insert notifications for each follower

  INSERT INTO Notifications (user_id, sender_id, notification_type)

  SELECT fu.following_id, (SELECT user_id FROM Posts WHERE id = @post_id), fu.followingName + ' has made a post'

  FROM @followings AS fu;

END;



CREATE TRIGGER followUserTrigger

ON users.followTable

AFTER INSERT

AS

BEGIN

  SET NOCOUNT ON;

 

  DECLARE @following_id INT;

  DECLARE @user_id INT;

  DECLARE @notification_type VARCHAR(255);

 

  -- Retrieve the follower user ID and followed user ID

  SELECT @following_id = f.following_id, @user_id = f.user_id

  FROM users.followTable AS f

  WHERE f.id = (SELECT id FROM inserted);

 

  -- Retrieve the name of the follower user

  DECLARE @followingName VARCHAR(255);

  SELECT @followingName = u.username

  FROM users.userProfile AS u

  WHERE u.id = @following_id;

 

  -- Create a notification notification_type

  SET @notification_type = CONCAT(@followingName, ' followed you');

 

  -- Insert a new row in the Notifications table

  INSERT INTO Notifications (user_id, sender_id, notification_type)

  VALUES (@user_id, @following_id, @notification_type);

END;

---nbelow not implemented







CREATE TRIGGER likePostTrigger

ON posts.likeTable

AFTER INSERT

AS

BEGIN

  SET NOCOUNT ON;

 

  DECLARE @likeduser_id INT;

  DECLARE @postOwnerId INT;

  DECLARE @notification_type VARCHAR(MAX);

 

  -- Retrieve the liked user ID and post owner ID

  SELECT @likeduser_id = l.user_id, @postOwnerId = p.user_id

  FROM Likes AS l

  INNER JOIN Posts AS p ON p.id = l.post_id

  WHERE l.id = (SELECT id FROM inserted);

 

  -- Retrieve the name of the person who liked the post

  DECLARE @likedUserName VARCHAR(255);

  SELECT @likedUserName = u.username

  FROM Users AS u

  WHERE u.id = @likeduser_id;

 

  -- Create a notification notification_type

  SET @notification_type = CONCAT(@likedUserName, ' liked your post');

 

  -- Insert a new row in the Notifications table

  INSERT INTO Notifications (user_id, sender_id, notification_type)

  VALUES (@postOwnerId, @likeduser_id, @notification_type);

END;


