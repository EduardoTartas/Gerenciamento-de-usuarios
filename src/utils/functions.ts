import {admRole, guestRole, profRole} from '../services/roleServices';
import {defaultUser, saveAsCsv} from '../services/csvServices';

import {hashSync} from 'bcrypt';
import chalk from 'chalk';

export let error: string[] = [];

//change defaultUsers role
export function changeUserRole(role: string): void {
    if (role !== "adm" && role !== "guest" && role !== "prof") {
        error.push(`${chalk.bold("ERROR!009: ")}Selecione entre os niveis de acesso existente! 'adm', 'guest' ou 'prof'`);
        error.forEach((error) => {
            console.log(error);
        })
    } else {
        if (role == "adm") {
            defaultUser.role = admRole;
        } else if (role == "prof") {
            defaultUser.role = profRole;
        } else defaultUser.role = guestRole;

        defaultUser.lastEdit = new Date();
        console.log(`Nivel de acesso da sessão atual atualizada para ${chalk.bold(defaultUser.role.name)}`);
        saveAsCsv();
    }

}

//verify fields
export function verifyName(name: string) {
    let nameRegex = /^[\s\S]{3,25}$/;
    if (!nameRegex.test(name)) {
        error.push(`${chalk.bold("ERROR!000: ")}Digite o nome do usuário, com no mínimo 3 e no maximo 25 caracteres`);
    }
}

export function verifyEmail(email: string) {
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        error.push(`${chalk.bold("ERROR!001: ")}Digite um email válido para o usuário`);
    }
}

export function verifyPassword(password: string) {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (!passwordRegex.test(password)) {
        error.push(`${chalk.bold("ERROR!002: ")}Digite uma senha com no mínimo 8 caracteres, letras maiúsculas, letras minúsculas e um caracter especial`);
    }
}

export function verifyRole(role: string) {
    if (role !== "adm" && role !== "guest" && role !== "prof") {
        error.push(`${chalk.bold("ERROR!003: ")}Selecione entre os niveis de acesso existente! 'adm', 'guest' ou 'prof'`);
    }
}

//encrypt password
export function encrypt(password: string): string {
    const passwordHash = hashSync(password, 8);
    return passwordHash;
}

//show errors
export function showErrors(): void {
    error.forEach((error) => {
        console.log(error);
    })
}

//clear terminal
export function clear(): void {
    console.log('\x1Bc');
}
