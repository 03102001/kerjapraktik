module.exports = (sequelize, DataTypes) => {
  const EmplRole = sequelize.define(
    'EmplRole',
    {
      EmplRoleID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        field: 'empl_role_id',
        autoIncrement: false,
        validate: {
          notEmpty: true
        }
      },
      EmployeeID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'employee_id',
        //unique: true,
        validate: {
          notEmpty: true
        }
      },
      RoleID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'role_id',
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
      tableName: 'emplrole'
    }
  );

  EmplRole.associate = function (models) {
    EmplRole.belongsTo(models.HrEmployee, {
      as: 'Employees',
      foreignKey: 'EmployeeID',
      onDelete: 'RESTRICT'
    });
    EmplRole.belongsTo(models.Role, {
      as: 'Roles',
      foreignKey: 'RoleID',
      onDelete: 'RESTRICT'
    });
  };

  return EmplRole;
};
