//import * as roleServices from '../src/services/roleServices';
//import * as userServices from '../src/services/userServices';
//import { Role } from './models/roles';
//import defaultGuest from './services/userServices';
import {defaultAdm,clear} from './services/userServices';
import { Command } from "commander";
import chalk from 'chalk';
const program = new Command();
let currentUser = defaultAdm;

//add a new user
program
  .command("newUser")
  .description(chalk.bold("Adiciona um novo usuário."))
  .argument("<name>", "User name")
  .argument("<email>", "User email")
  .argument("<password>", "User password")
  .argument("<role>", "User role")
  .action((name, email, password, role) => {
    
    if(!currentUser.role.regisrterPerm){
      clear();
      console.log(chalk.bold("----- TENTE NOVAMENTE -----"))
      console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else{
      try{
        currentUser.registerUser(name, email, password, role);
      }
      catch(error){
        clear();
        console.log(error,"Não foi possivel cadastrar o novo usuário.")
      }
    }
  });

//list users
 program
  .command("listUsers")
  .description(chalk.bold("Lista todos os usuários cadastrados."))
  .action(()=>{
    if(!currentUser.role.listAllPerm){
      clear();
      console.log(chalk.bold("----- TENTE NOVAMENTE -----"))
      console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else{
      try{
        clear();
        currentUser.listUsers();
      }
      catch(error){
        clear();
        console.log(error,"Não foi possivel listar os usuários.")
      }
    }
  });

  //list users by id
  program
    .command("listUser")
    .description(chalk.bold("Lista o usuário pelo o seu ID."))
    .argument("<ID>", "User ID")
    .action((ID) =>{
      if(!currentUser.role.listByIdPerm){
        clear();
        console.log(chalk.bold("----- TENTE NOVAMENTE -----"))
        console.log("Você não tem a permissão necessaria para realizar essa ação!");
      }
      else{
        try{
          clear();
          currentUser.listUserByID(ID);
        }
        catch(error){
          clear();
          console.log(error,"Não foi possivel listar os usuários.")
        }
      }
    })

   
program.parse();


/* PARA FAZER
1. Terminar funções principais
    1.1. exluir
    1.2. editar
    1.3. trocar função
2. Criptografia da senha
3. Salvar no aquivo csv
*/