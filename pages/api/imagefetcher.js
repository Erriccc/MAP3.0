export default async function imagefetcher(req, res)  {
    const url = decodeURIComponent(req.query.url);
      // Fetch the original image
      // fetch(url)
      // // Retrieve its body as ReadableStream
      // .then((response) => response.body)
      // .then((body) => {
      //   body.pipe(res);
      // });



    const result = await fetch(url);
    const body = result.body;

    body.pipe(res);
  };






//   export default async (req, res) => {
//     const url = decodeURIComponent(req.query.url);
//     const result = await fetch(url);
//     const body = await result.body;
//     body.pipe(res);
//   }; 