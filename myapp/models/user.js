module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define('user', {
      usr_idx: { field: 'usr_idx', type: DataTypes.INTEGER(11), primaryKey: true, allowNull: false, autoIncrement: true },
      usr_id: { field: 'usr_id', type: DataTypes.STRING(45), allowNull: false },
      usr_pwd: { field: 'usr_pwd', type: DataTypes.STRING(45), allowNull: false },
      usr_nm: { field: 'usr_nm', type: DataTypes.STRING(45), allowNull: false }
    }, {
      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: true,
  
      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,
      timestamps: false,
      // define the table's name
      tableName: 'user'
    });
  
    return user;
  };