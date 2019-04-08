

module.exports = (sequelize, DataTypes) => {

    const AdminUsers = sequelize.define('AdminUsers', {
        id: { field: 'Id', type: DataTypes.STRING, primaryKey: true },
        name: { field: 'Name', type: DataTypes.STRING, allowNull: false },
        type: { field: 'Type', type: DataTypes.STRING, allowNull: false },
        passwordHash: { field: 'PasswordHash', type: DataTypes.STRING, allowNull: false },
        phone: { field: 'Phone', type: DataTypes.STRING, allowNull: false },
        emailAddress: { field: 'EmailAddress', type: DataTypes.STRING },
        modifier: { field: 'Modifier', type: DataTypes.STRING },
        createdAt: { field: 'CreatedDate', type: DataTypes.DATE, allowNull:false, defaultValue: DataTypes.NOW },
        updatedAt: { field: 'UpdatedDate', type: DataTypes.DATE, allowNull:false, defaultValue: DataTypes.NOW }
    });

    return AdminUsers;
};

