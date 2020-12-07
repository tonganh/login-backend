// const Post = (sequelize, type) => {
//   sequelize.define('Posts',
//     {
//       id: {
//         type: type.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       cateID: {
//         type: type.INTEGER,
//         references: {
//           model: User,
//           key: 'id',
//         },
//       },
//     },
//     {
//       tableName: 'Posts',
//       timestamps: false,
//     });
// };
// module.exports = { Post };
