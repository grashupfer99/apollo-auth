const Church = require("../../models/church");

module.exports = {
  churches: async () => {
    const churches = await Church.find();
    return churches.map(church => {
      return {
        _id: church._id,
        name: church.name,
        location: church.location,
        address: church.address,
        createdAt: church.createdAt
      };
    });
  }
};
