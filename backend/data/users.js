import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Ana Dzanic",
        email: "ana@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
    {
        name: "Tamara Vujasevic",
        email: "tamara@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
    {
        name: "Kata Banci",
        email: "kata@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    }
];

export default users;