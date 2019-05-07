// exports.dateToString = date => new Date(date).toISOString();
module.exports = {
  formatDate: getDate => {
    const date = new Date(getDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${year}.${month + 1}.${day}`;
  },
  dateToString: date => new Date(date).toISOString()
};
