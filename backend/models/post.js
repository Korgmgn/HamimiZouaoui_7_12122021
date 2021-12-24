'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user, comment }) {
      // define association here
      this.belongsTo(user, { foreignKey: 'userId' })
      this.hasMany(comment, { foreignKey: 'postId', as: 'comments' })
    }
    toJSON(){
        return { ...this.get(), id: undefined, userId: undefined }
    }
  };
  post.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Post cannot be null' },
            notEmpty: { msg: 'Post cannot be empty' },
        }
    }
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'post',
  });
  return post;
};