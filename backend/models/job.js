'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Job.init({
    taskName: DataTypes.STRING,
    payload: DataTypes.JSON,
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      defaultValue: 'Medium'
    },
    status: {
      type: DataTypes.ENUM('pending', 'running', 'completed', 'failed'),
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};