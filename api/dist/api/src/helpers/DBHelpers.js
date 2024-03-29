"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewID = void 0;
const db_1 = require("../db");
const getNewID = (table) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`SELECT COUNT(*) FROM ${table}`);
        const newID = Number(result.rows[0].count) + 1;
        return newID;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.getNewID = getNewID;
