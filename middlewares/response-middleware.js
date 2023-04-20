
module.exports = (req, res, next) => {
    console.log("this is great")
  try {
    const oldSend = res.send;

    res.send = function(data){
        // arguments[0] (or `data`) contains the response body
        const newData = data
        newData["date"]=new Date()
        oldSend.apply(res, [newData]);
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};