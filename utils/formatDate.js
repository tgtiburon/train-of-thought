
const formatDate = (date) => {

    const formattedTime =  `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date).getFullYear()} at ${new Date(date).getHours()}:${(new Date(date).getMinutes()<10?'0':'') + date.getMinutes()}`;
     
return formattedTime;

};
  

 module.exports = formatDate;