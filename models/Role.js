module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      RoleID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        field: 'role_id',
        autoIncrement: false,
        validate: {
          notEmpty: true
        }
      },
      RoleName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        field: 'role_name',
        //unique: true,
        validate: {
          notEmpty: true
        }
      },
      RoleDesc: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'role_desc',
        validate: {
          notEmpty: true
        }
      },
      IsActive: {
        type: DataTypes.STRING(1),
        allowNull: false,
        field: 'is_active',
        validate: {
          notEmpty: true
        }
      },
      CreatedBy: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'created_by',
        validate: {
          notEmpty: true
        }
      },
      ModifiedBy: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'modified_by',
        validate: {
          notEmpty: false
        }
      }
    },
    {
      freezeTableName: true,
      tableName: 'role'
    }
  );  

  Role.associate = function (models) {
    Role.hasMany(models.EmplRole, {
      as: 'EmplRoles',
      foreignKey: 'RoleID'
    });
  };

  return Role;
};
