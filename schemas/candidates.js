module.exports = (sequelize, Database) => {
	return sequelize.define('candidates', {
		id: {
			type: Database.INTEGER,
			primaryKey: true,
			unique: true,
			autoIncrement: true
		},
		name: Database.STRING,
	}, {
		timestamps: false
	})
};
