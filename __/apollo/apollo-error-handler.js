export default (error, context) => {
  console.log({ context });
  // context.error({ statusCode: 304, message: 'Server error' })
  console.error({ error });
};
