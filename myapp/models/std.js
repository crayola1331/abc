module.exports = function (sequelize, DataTypes) {
    const std = sequelize.define('std', {
      std_idx: { field: 'std_idx', type: DataTypes.INTEGER(11), primaryKey: true, allowNull: false },
      std_num: { field: 'std_num', type: DataTypes.INTEGER(11), primaryKey: true, allowNull: false },
      std_nm: { field: 'std_nm', type: DataTypes.STRING(45), allowNull: false },
      std_major: { field: 'std_major', type: DataTypes.STRING(45), allowNull: false },
      std_rate: { field: 'std_rate', type: DataTypes.INTEGER(11), allowNull: false },
      std_email: { field: 'std_email', type: DataTypes.STRING(100), allowNull: true },
      std_sex: { field: 'std_sex', type: DataTypes.STRING(10), allowNull: false },
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
      tableName: 'gb_std'
    });
  
    return std;
  };