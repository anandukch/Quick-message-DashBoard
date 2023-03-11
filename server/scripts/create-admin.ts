/* eslint import/newline-after-import: "off" */
/* eslint import/first: "off" */
import { config } from "dotenv";
config();
import readline from "readline";
import { hash } from "bcrypt";
import { userSchema } from "../services/databse.service";
import dbConnection from "../config/db";

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function insertToDB(email: string, password: string) {
    try {
        const hashedPassword = await hash(password, 10);
        const createdUser = userSchema.create({
            email,
            password: hashedPassword,
        });
        await userSchema.save(createdUser);
        console.log("User is created successfully");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

function getPassword(email: string) {
    r1.question("Enter the password: ", (password) => {
        const passwordPattern =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        if (passwordPattern.test(password)) {
            insertToDB(email, password);
        } else {
            console.log(
                "Password Contains min 8 characters. 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character"
            );
            getPassword(email);
        }
    });
}

async function getEmail() {
    await dbConnection.initialize();

    r1.question("\nEnter the email: ", (email) => {
        const emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        if (emailPattern.test(email)) {
            getPassword(email);
        } else {
            console.log("Invalid Email");
            console.log("Enter a Valid Email");
            getEmail();
        }
    });
}

getEmail();
