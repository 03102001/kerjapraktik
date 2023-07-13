module.exports = (sequelize, DataTypes) => {
    const PasswordHist = sequelize.define(
        "PasswordHist",
        {
            PasswordHistID: {
                type: DataTypes.STRING(20),
                primaryKey: true,
                allowNull: false,
                field: "password_hist_id",
                autoIncrement: false,
                validate: {
                    notEmpty: true,
                },
            },
            EmployeeID: {
                type: DataTypes.STRING(30),
                allowNull: false,
                field: "employee_id",
                validate: {
                    notEmpty: true,
                },
            },
            UserPassword: {
                type: DataTypes.STRING(300),
                allowNull: false,
                field: "user_password",
                validate: {
                    notEmpty: true,
                },
            },
            PassChangeDate: {
                type: DataTypes.DATE,
                allowNull: false,
                field: "pass_change_date",
                validate: {
                    notEmpty: false,
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
            tableName: "passwordhist",
        }
    );

    return PasswordHist;
};
