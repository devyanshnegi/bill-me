export const getData = (req, res) => {
    res.json({ message: "Getting data from SmartStartTIAA2023" });
};

export const postData = (req, res) => {
    const { field1, field2 } = req.body;
    // Handle the logic of storing or processing data
    res.json({ message: "Data received", data: { field1, field2 } });
};
