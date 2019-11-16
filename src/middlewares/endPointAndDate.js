const endPointAndDateConsole = (req,res,next) => {
  const date = new Date()
  console.log('Date: '+ date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear());
  console.log("Hour: "+ date.getHours() + ":" + date.getMinutes() + ":"+date.getSeconds());
  next();
};

module.exports = {
  endPointAndDateConsole,
};