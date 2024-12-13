"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.defaultProf = exports.defaultGuest = exports.defaultAdm = exports.Users = void 0;
exports.clear = clear;
const uuid_1 = require("uuid");
const roleServices_1 = require("./../services/roleServices");
const chalk_1 = __importDefault(require("chalk"));
class Users {
    constructor(name, email, password, role) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.registerDate = new Date();
        this.lastEdit = new Date();
        this.status = true;
    }
    registerUser(name, email, password, roles) {
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        let nameRegex = /^[\s\S]{3,25}$/;
        let error = [];
        let role = roles.toLocaleLowerCase();
        if (!nameRegex.test(name)) {
            error.push(`${chalk_1.default.bold("ERROR!000: ")}Digite o nome do usuário, com no mínimo 3 e no maximo 25 caracteres`);
        }
        /* ------- */
        if (!emailRegex.test(email)) {
            error.push(`${chalk_1.default.bold("ERROR!001: ")}Digite um email válido para o usuário`);
        }
        /* ------- */
        if (!passwordRegex.test(password)) {
            error.push(`${chalk_1.default.bold("ERROR!002: ")}Digite uma senha com no mínimo 8 caracteres, letras maiúsculas, letras minúsculas e um caracter especial`);
        }
        if (role !== "adm" && role !== "guest" && role !== "prof") {
            error.push(`${chalk_1.default.bold("ERROR!003: ")}Selecione entre os niveis de acesso existente! 'adm', 'guest' ou 'prof'`);
        }
        if (error.length <= 0) {
            let userRole;
            if (role === "adm") {
                userRole = roleServices_1.admRole;
            }
            else if (role === "guest") {
                userRole = roleServices_1.guestRole;
            }
            else {
                userRole = roleServices_1.profRole;
            }
            const newUser = new Users(name, email, password, userRole);
            exports.users.push(newUser);
            clear();
            console.log("Usuário criado com Sucesso");
            console.log(exports.users);
        }
        else {
            clear();
            console.log(`${chalk_1.default.bold(`----- TENTE NOVAMENTE -----`)}`);
            error.forEach((error) => {
                console.log(error);
            });
        }
    }
    listUsers() {
        if (exports.users.length <= 0) {
            clear();
            console.log(`${chalk_1.default.bold("ERROR!004: ")}Nenhum usuário encontrado`);
        }
        else {
            clear();
            console.log(`${chalk_1.default.bold(`----- USUÁRIOS CADASTRADOS -----`)}`);
            exports.users.forEach(user => {
                console.log(`\nID: ${chalk_1.default.bold.green(user.id)}\nNome: ${user.name}\nE-mail: ${user.email}\nNivel de acesso: ${user.role.name}`);
            });
        }
    }
    //list user by ID
    listUserByID(id) {
        let filterdUsers = exports.users.filter(user => user.id === id);
        if (filterdUsers.length <= 0) {
            clear();
            console.log(filterdUsers);
            console.log(`${chalk_1.default.bold("ERROR!005: ")}Nenhum usuário encontrado`);
        }
        else {
            clear();
            console.log(`${chalk_1.default.bold(`----- USUÁRIO FILTRADO -----`)}`);
            filterdUsers.forEach(user => {
                console.log(`\nID: ${chalk_1.default.bold.green(user.id)}\nNome: ${user.name}\nE-mail: ${user.email}\nNivel de acesso: ${user.role.name}`);
            });
        }
    }
}
exports.Users = Users;
function clear() {
    console.log('\x1Bc');
}
exports.defaultAdm = new Users("defaultAdm", "teste@gmail.com", "'123", roleServices_1.admRole);
exports.defaultGuest = new Users("defaultGuest", "teste@gmail.com", "'123", roleServices_1.guestRole);
exports.defaultProf = new Users("defaultProf", "teste@gmail.com", "'123", roleServices_1.profRole);
const teste1 = new Users("teste", "teste@teste.com", "123teste", roleServices_1.admRole);
const teste2 = new Users("teste2", "teste@teste.com", "123teste", roleServices_1.guestRole);
const teste3 = new Users("teste3", "teste@teste.com", "123teste", roleServices_1.profRole);
teste1.id = "123";
/*function userValid():void{

}*/
exports.users = [];
exports.users.push(teste1, teste2, teste3);