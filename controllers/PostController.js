
const PostModel = require('../models/PostModel');
const response = require('../helpers/response');

const getPost = async (req, res, next) => {
    try {
        const result = await PostModel.find({ isdelete: false });

        if (result) {
            res.status(200).send(response(200, "Lấy dữ liệu thành công !!!", result, true));
        } else {
            res.status(201).send(response(200, "Lấy dữ liệu không thành công !!!", [], false));
        }
    } catch (error) {
        res.status(500).send(response(500, JSON.stringify(error), [], false));
    }
}

const createPost = async (req, res, next) => {
    try {
        const { title, content, author, attachment } = req.body;
        const result = await PostModel.create({
            title: title,
            content: content,
            author: author,
            attachment: attachment
        });

        if (result) {
            res.send(response(200, "Tạo dữ liệu thành công !!!", result, true));
        } else {
            res.send(response(201, "Tạo dữ liệu không thành công !!!", [], false));
        }
    } catch (error) {
        res.status(500).send(response(500, JSON.stringify(error), [], false));
    }
}

const updatePost = async (req, res, next) => {
    try {
        const { title, content, author, attachment, id } = req.body;
        const result = await PostModel.updateOne({ _id: id }, {
            title: title,
            content: content,
            author: author,
            attachment: attachment,
        });

        if (result) {
            const data = await PostModel.find({ isdelete: false });
            res.send(response(200, "Cập nhật dữ liệu thành công !!!", data, true));
        } else {
            res.send(response(201, "Cập nhật dữ liệu không thành công !!!", [], false));
        }
    } catch (error) {
        res.status(500).send(response(500, JSON.stringify(error), [], false));
    }
}

const updatePostLike = async (req, res, next) => {
    try {
        const { likes, id } = req.body;
        const result = await PostModel.updateOne({ _id: id }, {
            likes: likes
        });

        if (result) {
            const data = await PostModel.find({ isdelete: false });
            res.send(response(200, "Cập nhật dữ liệu thành công !!!", data, true));
        } else {
            res.send(response(201, "Cập nhật dữ liệu không thành công !!!", [], false));
        }
    } catch (error) {
        res.status(500).send(response(500, JSON.stringify(error), [], false));
    }
}

const deletePost = async (req, res, next) => {
    try {
        const { id } = req.body;
        const result = await PostModel.updateOne({ _id: id }, {
            isdelete: true
        });

        if (result) {
            res.send(response(200, "Xoá dữ liệu thành công !!!", result, true));
        } else {
            res.send(response(201, "Xoá dữ liệu không thành công !!!", [], false));
        }
    } catch (error) {
        res.status(500).send(response(500, JSON.stringify(error), [], false));
    }
}

module.exports = {
    getPost,
    createPost,
    updatePost,
    deletePost,
    updatePostLike
}