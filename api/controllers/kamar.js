import Kamar from "../models/Kamar.js";
import KamarSales from "../models/KamarSales.js";

export const createKamar = async (req, res, next) => {
    const newKamar = new Kamar(req.body);
    const allKamars = await Kamar.find();

    const result = allKamars.map((k) => {
        if (k.category === req.body.category && k.color === req.body.color && k.size === req.body.size && k.temir === req.body.temir) {
            return true;
        } else {
            return false;
        }
    })

    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }

    if (contains(result, true)) {
        res.status(400).json("This type already exists!");
    } else {
        try {
            const savedKamar = await newKamar.save();
            res.status(200).json(savedKamar);
        } catch (err) {
            next(err);
        }
    }

};


export const updateKamar = async (req, res, next) => {
    try {
        const updateKamar = await Kamar.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateKamar);
    } catch (err) {
        next(err);
    }
};

export const deleteKamar = async (req, res, next) => {
    try {
        await Kamar.findByIdAndDelete(req.params.id);
        await KamarSales.deleteMany({ "kamarId": req.params.id })
        res.status(200).json("Kamar has been deleted");
    } catch (err) {
        next(err);
    }
};

export const getKamar = async (req, res, next) => {
    try {
        const kamar = await Kamar.findById(req.params.id);
        res.status(200).json(kamar);
    } catch (err) {
        next(err);
    }
};

export const getKamars = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
        const kamars = await Kamar.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 },
        }).limit(req.query.limit);
        res.status(200).json(kamars);
    } catch (err) {
        next(err);
    }
};

export const getWarehouse = async (req, res, next) => {
    try {
        const kamars = await Kamar.aggregate([
            {
                $project: {
                    totalSoni: { $sum: "$soni" },
                    totalMoney: {
                        $sum: {
                            $multiply: ["$soni", "$price"]
                        }
                    }
                }
            }
        ]);

        res.status(200).json(kamars)
    } catch (err) {
        next(err);
    }
}