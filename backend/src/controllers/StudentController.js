
const StudentServices = require('../services/StudentServices');
//controller only can have this methods = store(armazenar), index(listar todos recursos), destroy(excluir), show(um único recurso), update(atualizar)
module.exports = {
    storeByGitHub(req, res) {
        StudentServices.add.byGitHub(req, res);
    },
    storeBySimpleCredentials(req, res) {//route of sign up of students
        StudentServices.add.bySimpleCredentials(req, res);
    },
    index(req, res) {
        StudentServices.retrieve.allStudents(req, res);
    },
    destroy(req, res) {
        StudentServices.delete.oneStudent(req, res);
    },
    update(req, res){
        StudentServices.update.oneStudent(req, res);
    },
    show(req, res){
        StudentServices.retrieve.oneStudent(req, res);
    }
};