module.exports = function (sequelize, DataTypes) {
  // 이름이 Product인 Table을 만든다,또한 테이블과 관련된 column만든다
  // 일반적으로 sequelize에서는 table 명을 복수형태로 만들어주고 있습니다.따라서 테이블명을 products로 만든다
  const product = sequelize.define("Product", {
    name: {
      // name이 무슨 Type인지,글자수제한
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    seller: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
  });
  return product;
};
