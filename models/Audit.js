module.exports = (sequelize, DataTypes) => {
  const Audit = sequelize.define(
    "Audit",
    {
      AuditID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        field: "audit_id",
        autoIncrement: true,
        validate: {
          notEmpty: true,
        },
      },
      TableName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "table_name",
        validate: {
          notEmpty: true,
        },
      },
      OldData: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "old_data",
        validate: {
          notEmpty: true,
        },
      },
      NewData: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "new_data",
        validate: {
          notEmpty: true,
        },
      },
      Method: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: "method",
        validate: {
          notEmpty: true,
        },
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
      tableName: "audit",
      updatedAt: false,
    }
  );

  return Audit;
};
