module.exports = (sequelize, DataTypes) => {
  const HrEmployee = sequelize.define(
    'HrEmployee',
    {
      EmployeeID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        field: 'employee_id',
        autoIncrement: false,
        validate: {
          notEmpty: true
        }
      },
      BuID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'bu_id',
        references: {
          model: 'hrbusinessunit',
          key: 'bu_id'
        },
        validate: {
          notEmpty: true
        }
      },
      EmplSapId: {
        type: DataTypes.STRING(30),
        allowNull: false,
        field: 'empl_sap_id',
        //unique: true,
        validate: {
          notEmpty: true
        }
      },
      EmployeeName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'employee_name',
        validate: {
          notEmpty: true
        }
      },
      UserName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        //unique: true,
        field: 'user_name',
        validate: {
          notEmpty: true
        }
      },
      UserPassword: {
        type: DataTypes.STRING(300),
        allowNull: true,
        field: 'user_password',
        validate: {
          notEmpty: false
        }
      },
      AuthenticationType: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'authentication_type',
        validate: {
          notEmpty: true
        }
      },
      EmailAddress: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'email_address',
        validate: {
          notEmpty: false,
          isEmail: true
        }
      },
      // Verified: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: true,
      //   field: 'verified',
      //   validate: {
      //     notEmpty: false
      //   }
      // },
      // VerificationCode: {
      //   type: DataTypes.STRING(100),
      //   allowNull: true,
      //   field: 'verification_code',
      //   validate: {
      //     notEmpty: false
      //   }
      // },
      IsActive: {
        type: DataTypes.STRING(1),
        allowNull: false,
        field: 'is_active',
        validate: {
          notEmpty: true
        }
      },
      IsLock: {
        type: DataTypes.STRING(1),
        allowNull: false,
        field: 'is_lock',
        validate: {
          notEmpty: true
        }
      },
      IsLogged: {
        type: DataTypes.STRING(1),
        allowNull: true,
        field: 'is_logged',
        validate: {
          notEmpty: false
        }
      },
      LastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_login',
        validate: {
          notEmpty: false
        }
      },
      LastLogout: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_logout',
        validate: {
          notEmpty: false
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
      tableName: 'hremployee'
    }
  );

  HrEmployee.associate = function (models) {
    HrEmployee.belongsTo(models.HrBusinessUnit, {
      foreignKey: 'BuID',
      as: 'BusinessUnit',      
    });
    HrEmployee.hasMany(models.EmplRole, {
      as: 'EmplRoles',
      foreignKey: 'EmployeeID',      
    });
  };

  return HrEmployee;
};
