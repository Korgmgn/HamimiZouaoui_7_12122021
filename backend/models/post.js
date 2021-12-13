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
    static associate({ user }) {
      // define association here
      // userId
      this.belongsTo(user, { foreignKey: 'userId' })
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
            notNull: { msg: 'User must have a name' },
            notEmpty: { msg: 'Name must not be empty' },
        }
    }
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'post',
  });
  return post;
};