module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define(
        "Department",
        {
            DepartmentID: {
                type: DataTypes.STRING(50),
                primaryKey: true,
                allowNull: false,
                field: "department_id",
                autoIncrement: false,
                validate: {
                    notEmpty: true,
                },
            },
            DepartmentName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                field: "department_name",
                validate: {
                    notEmpty: true,
                },
            },
            DepartmentRef: {
                type: DataTypes.STRING(20),
                allowNull: false,
                field: "department_ref",
                validate: {
                    notEmpty: false,
                },
            },
            DepartmentDesc: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: "department_desc",
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
                type: DataTypes.STRING(50),
                allowNull: false,
                field: "created_by",
                validate: {
                    notEmpty: true,
                },
            },
            UpdatedBy: {
                type: DataTypes.STRING(50),
                allowNull: false,
                field: "updated_by",
                validate: {
                    notEmpty: false,
                },
            },
        },
        {
            freezeTableName: true,
            tableName: "dmsdepartment",
        }
    );
    return Department;
};