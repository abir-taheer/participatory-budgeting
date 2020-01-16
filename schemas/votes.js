module.exports = (sequelize, Database) => {
	return sequelize.define('votes', {
		id: {
			type: Database.INTEGER,
			primaryKey: true,
			unique: true,
			autoIncrement: true
		},
		email: {
			type: Database.STRING,
			allowNull: false
		},
	})
};
