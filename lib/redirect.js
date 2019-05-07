import Router from "next/router";

export default (context, target) => {
  if (context.res) {
    // server
    // 303: "See other"
    console.log("303: See other ", context);
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    console.log("Router.replace(target) ", target);
    Router.replace(target);
  }
};
