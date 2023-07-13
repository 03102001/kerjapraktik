module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            UserID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                field: "user_id",
                autoIncrement: false,
                validate: {
                    notEmpty: true,
                },
            },
            UserName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                field: "user_name",
                validate: {
                    notEmpty: true,
                },
            },
            Password: {
                type: DataTypes.STRING(10),
                allowNull: false,
                field: "barang_desc",
                validate: {
                    notEmpty: false,
                },
            },
            Department: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "department",
                validate: {
                    notEmpty: false,
                },
            },
            Role: {
                type: DataTypes.STRING(20),
                allowNull: false,
                field: "role",
                validate: {
                    notEmpty: false,
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
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "created_by",
                validate: {
                    notEmpty: true,
                },
            },
            UpdatedBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "updated_by",
                validate: {
                    notEmpty: false,
                },
            },
        },
        {
            freezeTableName: true,
            tableName: "dmsuser",
        }
    );
    return User;
};