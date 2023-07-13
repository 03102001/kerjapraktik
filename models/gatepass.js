module.exports = (sequelize, DataTypes) => {
    const Gatepass = sequelize.define(
        "Gatepass",
        {
            GatepassID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                field: "gatepass_id",
                autoIncrement: false,
                validate: {
                    notEmpty: true,
                },
            },
            GatepassCode: {
                type: DataTypes.STRING(20),
                allowNull: false,
                field: "gatepass_name",
                validate: {
                    notEmpty: true,
                },
            },
            GatepassRef: {
                type: DataTypes.STRING(20),
                allowNull: false,
                field: "gatepass_ref",
                validate: {
                    notEmpty: false,
                },
            },
            Destination: {
                type: DataTypes.STRING(50),
                allowNull: false,
                field: "destination",
                validate: {
                    notEmpty: false,
                },
            },
            Department: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: "department",
                validate: {
                    notEmpty: false,
                },
            },
            Reason: {
                type: DataTypes.STRING(100),
                allowNull: true,
                field: "reason",
                validate: {
                    notEmpty: false,
                },
            },
            Driver: {
                type: DataTypes.STRING(50),
                allowNull: false,
                field: "driver",
                validate: {
                    notEmpty: false,
                },
            },
            SIM_KTP: {
                type: DataTypes.STRING(20),
                allowNull: false,
                field: "sim_ktp",
                validate: {
                    notEmpty: false,
                },
            },
            Vehicle: {
                type: DataTypes.STRING(20),
                allowNull: false,
                field: "vehicle",
                validate: {
                    notEmpty: false,
                },
            },
            VehicleDesc: {
                type: DataTypes.STRING(50),
                allowNull: false,
                field: "vehicle_desc",
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
            ApprovedBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "approved_by",
                validate: {
                    notEmpty: false,
                },
            },
            CancelBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "cancel_by",
                validate: {
                    notEmpty: false,
                },
            },
            CancelDate: {
                type: DataTypes.DATE,
                allowNull: false,
                field: "cancel_date",
                validate: {
                    notEmpty: false,
                },
            },
            CancelReason: {
                type: DataTypes.STRING(50),
                allowNull: false,
                field: "cancel_reason",
                validate: {
                    notEmpty: false,
                },
            },
            Status: {
                type: DataTypes.STRING(10),
                allowNull: false,
                field: "status",
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
                type: DataTypes.STRING(10),
                allowNull: false,
                field: "created_by",
                validate: {
                    notEmpty: true,
                },
            },
            UpdatedBy: {
                type: DataTypes.STRING(10),
                allowNull: true,
                field: "updated_by",
                validate: {
                    notEmpty: false,
                },
            },
        },
        {
            freezeTableName: true,
            tableName: "dmsgatepass",
        }
    );
    return Gatepass;
};