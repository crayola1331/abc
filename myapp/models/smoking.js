module.exports = function (sequelize, DataTypes) {
    const smoking = sequelize.define('smoking', {
      location: { field: 'location', type: DataTypes.INTEGER(11), primaryKey: true, allowNull: false},
      smoke: { field: 'smoke', type: DataTypes.INTEGER(11),allowNull: false }
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
      tableName: 'sjsmoking'
    });
  
    return smoking;
  };