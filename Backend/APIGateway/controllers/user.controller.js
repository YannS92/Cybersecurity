exports.rdBoard = (req, res) => {
    res.status(200).send("RD Content.");
};

exports.testBoard = (req, res) => {
    res.status(200).send("Test Content.");
};
  
exports.prodBoard = (req, res) => {
    res.status(200).send("Production Content.");
};
