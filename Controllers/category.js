const Category = require("../Models/category");

exports.list = async (req, res) => {
    try {
        const category = await Category.find({}).exec();
        res.send(category);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.listby = async (req, res) => {
    try {
        console.log(req.body)
        const { limit, sort, order, query } = req.body.filters


        let producted;

        if (query === "" || !query) {
            // หาก query เป็นข้อความว่าง
            producted = await Product.find()
                .limit(limit)
                .sort([[sort, order]])
                .populate("category")
                .exec();
        } else {
            // หาก query มีค่า
            producted = await Product.find({ $text: { $search: `*${query}*` } })
                .limit(limit)
                .sort([[sort, order]])
                .populate("category")
                .exec();
        }

        res.send(producted);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}
exports.create = async (req, res) => {
    try {
        console.log(req.body)
        const { name } = req.body;
        const category = await new Category({ name }).save();
        res.send(category);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findOne({ _id: id });
        res.send(category);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;

        const category = await Category.findOneAndUpdate(
            { _id: id },
            { name: name }
        );
        res.send(category);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};
exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findOneAndDelete({ _id: id });
        res.send(category);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};