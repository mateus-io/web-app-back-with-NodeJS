const SearchServices = require('../services/SearchServices');

module.exports = {
    async index(req, res){
        SearchServices.searchStudents(req, res);
    }
};