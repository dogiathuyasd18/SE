const User = require('../models/User');

const deleteUser = async (req, res) => {
    const id = req.user; // req.user contains user ID
    try {
        // Check the id exists
        const user = await User.findById(id);
        if (user) {
            // Delete the user
            const deletedUser = await User.findByIdAndDelete(id);
            res.status(200).json({
                message: 'User deleted successfully',
                user: { name: deletedUser.name },
            });
        } 
        else {
            // User doesn't exist
            res.status(404).json({
                message: "User not found",
                id: id,
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { deleteUser };
