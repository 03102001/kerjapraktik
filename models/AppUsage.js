module.exports = (sequelize, DataTypes) => {
    const AppUsage = sequelize.define(
      "AppUsage",
      {
        AppUsageID: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          allowNull: false,
          field: "appusage_id",
          autoIncrement: true,
          validate: {
            notEmpty: true,
          },
        },
        TableName: {
            type: DataTypes.STRING(500),
            allowNull: false,
            field: "table_name",
            validate: {
                notEmpty: true,
            },
        },        
        APIName: {
            type: DataTypes.STRING(500),
            allowNull: false,
            field: "api_name",
            validate: {
              notEmpty: true,
            },
        },   
        ParamName: {
            type: DataTypes.STRING(500),
            allowNull: false,
            field: "param_name",
            validate: {
              notEmpty: true,
            },
        }, 
        Method: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: "method",
            validate: {
                notEmpty: true,
            },
        },                    
        UsageDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'usage_date',
        validate: {
            notEmpty: false
        }
        },                       
        CreatedBy: {
          type: DataTypes.STRING(50),
          allowNull: false,
          field: "createdBy",
          validate: {
            notEmpty: true,
          },
        },
      },
      {
        freezeTableName: true,
        tableName: "appusage",
        updatedAt: false,
      }
    );
  
    return AppUsage;
  };
  