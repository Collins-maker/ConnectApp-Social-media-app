const mssql = require("mssql");
const config = require("../config/config");

async function updateUserProfile(req, res) {
  let user_id = req.params.user_id;
  try {
    let user = req.body;
    // Ensure the user_id is present in the request body
    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: 'user_id is required in the request body',
      });
    }

    let sql = await mssql.connect(config);
    if (sql.connected) {
      let results = await sql
        .request()
        .input('user_id', user_id)
        .input('first_name', user.first_name)
        .input('last_name', user.last_name)
        .input('username', user.username)
        .input('gender', user.gender)
        .input('email_address', user.email_address)
        .input('country', user.country)
        .input('phone_number', user.phone_number)
        .input('date_of_birth', user.date_of_birth)
        .input('profile_image', user.profile_image)
        .input('cover_image', user.cover_image)
        .input('bio_data', user.bio_data)
        .execute('updateUserProfile');

      console.log(results);

      if (results.rowsAffected[0] > 0) {
        return res.status(200).json({
          success: true,
          message: 'User profile has been updated',
          data: results.recordset,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'User not found or profile not updated',
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        message: 'Error connecting to the database',
      });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update user profile',
      error: error.message,
    });
  }
}


async function getAllUsers(req, res) {
  let sql = await mssql.connect(config);

  if (sql.connected) {
    let results = await sql.request().execute("getAllUsers");
    //   query('SELECT * from users.userProfile');

    let users = results.recordset;
    res.json({
      success: true,
      message: "fetched products successfully",
      results: users,
    });
  }
}

async function getUsersByUsername(req, res) {
  let username = req.params.username;
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql
      .request()
      .input("username", username)
      .execute("getUserByUsername");
    // query(`select * from users.userProfile where username = '${username}'`);
    let user = results.recordset[0];
    res.json({
      success: true,
      message: "user feltched successfully",
      results: user,
    });
  }
}

async function getUsersByUserId(req, res) {
  try {
    const user_id = req.params.user_id
    const sql = await mssql.connect(config);
    if (sql.connected) {
      console.log(sql.connected)
      const results = await sql
        .request()
        .input("user_id", user_id)
        .execute("getUserByUserId");

      const user = results.recordset[0];
      res.json({
        success: true,
        message: "Fetched user successfully",
        result: user,
      });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
}


async function followUser(req, res) {
 
  let user_id = req.params.user_id;

  const following_id = req.session?.user.user_id;
  try {
    let pool = req.pool;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("user_id", user_id)
        .input("following_id", following_id)
        .execute("follow");

      console.log(results);
    }
    res.status(200).json({
      success: true,
      message: `You have followed ${user_id}`,
    });
  } catch (error) {
    console.error("Error lfollowing:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while following user",
    });
  }
}

//unfollow user
async function unfollowUser(req, res) {
 
  let user_id = req.params.user_id;

  const following_id = req.session?.user.user_id;
  try {
    let pool = req.pool;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("user_id", user_id)
        .input("following_id", following_id)
        .execute("unfollow");

      console.log(results);
    }
    res.status(200).json({
      success: true,
      message: `You have unfollowed ${user_id}`,
    });
  } catch (error) {
    console.error("Error unfollowing:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while unfollowing user",
    });
  }
}


async function getUsersFollowers(req, res) {
  const username = req.session?.user.username;
  let users;

  try {
    let sql = await mssql.connect(config);
    if (sql.connected) {
      let results = await sql
        .request()
        .input("username", username)
        .execute("getUserFollowers");

      users = results.recordset;
      res.json({
        success: true,
        message: "users fetched successfully",
        results: users,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to connect to the database",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the users",
    });
  }
}

module.exports = {
  getAllUsers,
  getUsersByUsername,
  getUsersFollowers,
  getUsersByUserId,
  followUser,
  unfollowUser,
  updateUserProfile
};
