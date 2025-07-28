"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.users = [
    {
        id: 1,
        email: "test@example.com",
        password: bcryptjs_1.default.hashSync("geheim123", 10),
        role: "kunde",
    },
    {
        id: 2,
        email: "admin@example.com",
        password: bcryptjs_1.default.hashSync("adminpass", 10),
        role: "admin",
    },
];
const bewertungRoutes_1 = __importDefault(require("./Routes/bewertungRoutes"));
// ...
app.use("/api/bewertungen", bewertungRoutes_1.default);
