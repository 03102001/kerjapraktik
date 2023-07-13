module.exports = (sequelize, DataTypes) => {
    const GatepassDetail = sequelize.define(
        "GatepassDetail",
        {
            GatepassDetailID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                field: "gatepass_detail_id",
                autoIncrement: false,
                validate: {
                    notEmpty: true,
                },
            },
            BarangID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "barang_id",
                validate: {
                    notEmpty: true,
                },
            },
            GatepassID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "gatepass_id",
                validate: {
                    notEmpty: true,
                },
            },
            SerialNo: {
                type: DataTypes.STRING(20),
                allowNull: false,
                field: "serial_no",
                validate: {
                    notEmpty: false,
                },
            },
            Description: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: "description",
                validate: {
                    notEmpty: false,
                },
            },
            Quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "quantity",
                validate: {
                    notEmpty: false,
                },
            },
            Satuan: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: "satuan",
                validate: {
                    notEmpty: false,
                },
            },
            Remark: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: "remark",
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
            tableName: "dmsgatepassdetail",
        }
    );
    return GatepassDetail;
};