

exports.index = (req, res, next) => {

    res.viewbag.title = 'Cleanbell Premium Admin - Home';

    res.viewbag.bodyPath = '../home/index';

    next();
}