module.exports = (sequelize, DataTypes) => {
  const HrBusinessUnit = sequelize.define(
    "HrBusinessUnit",
    {
      BuID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        field: "bu_id",
        autoIncrement: false,
        validate: {
          notEmpty: true,
        },
      },
      BuCode: {
        type: DataTypes.STRING(30),
        allowNull: false,
        field: "bu_code",
        //unique: true,
        validate: {
          notEmpty: true,
        },
      },
      BuName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "bu_name",
        validate: {
          notEmpty: true,
        },
      },
      BuDesc: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "bu_desc",
        validate: {
          notEmpty: true,
        },
      },
      IsActive: {
        type: DataTypes.STRING(1),
        allowNull: false,
        field: "is_active",
        validate: {
          notEmpty: true,
        },
      },
      CreatedBy: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "created_by",
        validate: {
          notEmpty: true,
        },
      },
      ModifiedBy: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: "modified_by",
        validate: {
          notEmpty: false,
        },
      },
    },
    {
      freezeTableName: true,
      tableName: "hrbusinessunit",
    }
  );

  HrBusinessUnit.associate = function (models) {
    HrBusinessUnit.hasMany(models.HrEmployee, {
      foreignKey: "BuID",
      as: "employees",   
      onDelete: 'RESTRICT'   
    });
  };

  return HrBusinessUnit;
};
