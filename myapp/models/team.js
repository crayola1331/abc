module.exports = function (sequelize, DataTypes) {
    const team = sequelize.define('team', {
      tm_idx: { field: 'tm_idx', type: DataTypes.INTEGER(11), primaryKey: true, allowNull: false, autoIncrement: true },
      tm_sbj_nm: { field: 'tm_sbj_nm', type: DataTypes.STRING(45), allowNull: false },
      tm_prof_nm: { field: 'tm_prof_nm', type: DataTypes.STRING(45), allowNull: false },
      tm_nm: { field: 'tm_nm', type: DataTypes.STRING(45), allowNull: false },
      tm_exp_date: { field: 'tm_exp_date', type: DataTypes.DATE, allowNull: false },
      tm_mem_idx: { field: 'tm_mem_idx', type: DataTypes.STRING(100), allowNull: false }
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