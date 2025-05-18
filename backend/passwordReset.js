const nodemailer = require("nodemailer");

function passwordResetHandler(db) {
  return (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Generate a new random password
    const generatePassword = () => {
      const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    };

    const newPassword = generatePassword();

    // Check if user exists
    const checkUserSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserSql, [email], (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update user's password
      const updatePasswordSql = "UPDATE users SET password = ? WHERE email = ?";
      db.query(updatePasswordSql, [newPassword, email], (err, updateResult) => {
        if (err) return res.status(500).json(err);

        // Send email with new password
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER, // Use environment variable for email user
            pass: process.env.EMAIL_PASS, // Use environment variable for email password
          },
        });

        const mailOptions = {
          from: "your-email@gmail.com",
          to: email,
          subject: "Your Password Has Been Reset",
          text: `Your new password is: ${newPassword}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(500).json({ error: "Failed to send email" });
          } else {
            return res
              .status(200)
              .json({ message: "New password sent to your email" });
          }
        });
      });
    });
  };
}

module.exports = passwordResetHandler;
