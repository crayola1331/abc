module.exports = function (sequelize, DataTypes) {
    const board = sequelize.define('board', {
      brd_idx: { field: 'brd_idx', type: DataTypes.INTEGER(11), primaryKey: true, allowNull: false, autoIncrement: true },
      brd_tm_idx: { field: 'brd_tm_idx', type: DataTypes.INTEGER(11), allowNull: false },
      brd_type: { field: 'brd_type', type: DataTypes.STRING(45), allowNull: false },
      brd_file_adrs: { field: 'brd_file_adrs', type: DataTypes.STRING(45), allowNull: true },
      brd_title: { field: 'brd_title', type: DataTypes.STRING(45), allowNull: false },
      brd_content: { field: 'brd_content', type: DataTypes.STRING(45), allowNull: true },
      brd_reg_date: { field: 'brd_reg_date', type: DataTypes.DATE, allowNull: false },
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
      tableName: 'gb_board'
    });
  
    return board;
  };