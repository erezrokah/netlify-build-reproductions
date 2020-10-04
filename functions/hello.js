export const hello = (event, content) => {
  console.log(event);

  return {
    statusCode: 200,
    body: 'Hello World',
  };
};
