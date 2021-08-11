const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id,
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id,
        },
        attributes: [
          'id',
          'car_maker',
          'car_model',
          'car_body',
          'review',
          'created_at'
        ],
        include: [
          {
            model: models.Comment,
            attributes: [
              'id',
              'comment_text',
              'post_id',
              'user_id',
              'created_at',
            ],
            include: {
              model: models.User,
              attributes: ['username'],
            },
          },
        ],
      });
    });
  }
}

// create fields/columns for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    car_maker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    car_model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    car_body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
