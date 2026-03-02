import { DataTypes } from "sequelize";

/**
 * Quiz ORM Model
 * Đại diện cho bảng "quizzes" trong database
 */
export default (sequelize) => {
  const Quiz = sequelize.define(
    "Quiz",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 255],
        },
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      timeLimit: {
        type: DataTypes.INTEGER, // phút
        allowNull: true,
        validate: {
          min: 1,
        },
      },
    },
    {
      tableName: "quizzes",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          fields: ["title"],
        },
        {
          fields: ["isPublished"],
        },
      ],
    },
  );

  return Quiz;
};
