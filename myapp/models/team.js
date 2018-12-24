module.exports = function (sequelize, DataTypes) {
    const team = sequelize.define('team', {
      tm_idx: { field: 'std_idx', type: DataTypes.INTEGER(11), primaryKey: true, allowNull: false },
      tm_sbj_nm: { field: 'std_num', type: DataTypes.STRING(45), allowNull: false },
      tm_prof_nm: { field: 'std_nm', type: DataTypes.STRING(45), allowNull: false },
      tm_nm: { field: 'std_major', type: DataTypes.STRING(45), allowNull: false },
      tm_exp_date: { field: 'std_rate', type: DataTypes.DATE, allowNull: false },
      tm_mem_idx: { field: 'std_email', type: DataTypes.STRING(100), allowNull: false }
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
      tableName: 'gb_team'
    });
  
    return team;
  };