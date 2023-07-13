module.exports = (sequelize, DataTypes) => {
    const Barang = sequelize.define(
        "Barang",
        {
            BarangID: {
                type: DataTypes.STRING(50),
                primaryKey: true,
                allowNull: false,
                field: "barang_id",
                autoIncrement: false,
                validate: {
                    notEmpty: true,
                },
            },
            BarangName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                field: "barang_name",
                validate: {
                    notEmpty: true,
                },
            },
            BarangDesc: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: "barang_desc",
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
            tableName: "dmsbarang",
        }
    );
    return Barang;
};