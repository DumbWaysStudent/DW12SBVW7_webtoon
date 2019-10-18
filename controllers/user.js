const { User } = require('../models');

exports.findOne = async (req, res) => {
  try {
    const data = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    const user = {
      id: data.id,
      name: data.name,
      imageUrl: data.imageUrl,
    };
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.editProfile = async (req, res) => {
  try {
    let imageUrl;
    if (!req.file) {
      const user = await User.findOne({
        where: { id: req.params.userId },
      });
      imageUrl = user.imageUrl;
    } else {
      imageUrl = req.file.path;
    }

    const user = await User.update(
      {
        name: req.body.name,
        imageUrl,
      },
      {
        where: { id: req.authorize_user.id },
        returning: true,
      },
    );
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};
