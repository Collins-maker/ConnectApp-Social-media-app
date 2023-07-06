SELECT * FROM users.userProfile

INSERT INTO users.userProfile (first_name, last_name,username, gender, email_address, Country, phone_number, date_of_birth, password)
VALUES
    ('John', 'Doe','JDoe', 'Male', 'johndoe@example.com', 'USA', '1234567890', '1990-01-01', 'password123'),
    ('Jane', 'Smith','JaneS', 'Female', 'janesmith@example.com', 'Canada', '9876543210', '1992-05-15', 'securepass');

	

INSERT INTO posts.postTable (user_id, written_text, image_url, video_url)
VALUES
    (7, 'Great Minds', 'https://example.com/images/sunset.jpg', ''),
    (2,'Wonderful Environment', 'https://example.com/images/meal.jpg', ''),
    (1,'Fun day at the beach', 'https://example.com/images/beach.jpg', 'https://example.com/videos/beach.mp4'),
    (6,'Amazing view from the mountaintop', 'https://example.com/images/mountain.jpg', '');

	SELECT * FROM posts.postTable;
	DELETE posts.postTable



INSERT INTO users.followTable (user_id, following_id)
VALUES
    (2,6),
    (1,2),
    (1,7),
    (2,1),
    (6,7),
    (2,7);

	SELECT * FROM users.followTable
	--SELECT * FROM users.userProfile
	


-- Sample data for comments table
INSERT INTO posts.commentsTable (user_id, post_id, Comment_text)
VALUES
    (1, 17, 'Looking good!'),
    (2, 18, 'What a wonderful place'),
    (6, 19, 'I love it!'),
	 (1, 20, 'Incredible!'),
    (7, 21, 'Wish I was there!');

	SELECT * FROM posts.commentsTable

	DELETE posts.commentsTable

SELECT * FROM posts.postTable

-- Sample data for likes table
INSERT INTO posts.likeTable (post_id, user_id, is_like)
VALUES
    (19,1,1),
    (18,7,1),
    (19,7,1),
    (20,6,1),
    (21,2,1),
    (22,2,1),
    (23,1,1);

	DELETE posts.likeTable
SELECT * FROM posts.likeTable
SELECT * FROM posts.postTable

 

