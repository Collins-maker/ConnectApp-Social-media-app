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
