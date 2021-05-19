'use strict';

/*
  In this example, we first declare a funcion and then explicitly export it

  Because we'll be building out an API that works with JSON, let's format
  our response as a JSON object
*/

// function handle404(req, res, next) {

//   const errorObject = {
//     status: 404,
//     message: 'Sorry, we could not find what you were looking for',
//   };

//   res.status(404).json(errorObject);
// }

// module.exports = handle404;
module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};
