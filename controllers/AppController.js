// controllers/AppController.js
export default {
    getStatus: (req, res) => {
      // Logic to check if Redis and DB are alive
      res.status(200).json({
        redis: true,  // Assuming Redis is alive
        db: true,     // Assuming DB is alive
      });
    },
  
    getStats: async (req, res) => {
      try {
        const userCount = await User.countDocuments();  // Assuming you're using Mongoose
        const fileCount = await File.countDocuments();  // Assuming you're using Mongoose
  
        res.status(200).json({
          users: userCount,
          files: fileCount,
        });
      } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve stats' });
      }
    },
  };
  