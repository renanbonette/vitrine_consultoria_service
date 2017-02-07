export default {
  database: `vitrine_consultoria_${process.env.NODE_ENV}`,
  username: 'root',
  password: '18971898',
  host: 'localhost',
  params: {
    dialect: 'mysql',
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'SecretVitrineConsultoria',
  jwtSession: { session: false },
};
