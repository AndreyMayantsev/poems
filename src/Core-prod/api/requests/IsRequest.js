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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAxis = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 *
 * @param url - api entrypoint url
 * @param rdata - request data for api-request
 * @returns
 */
function isAxis(rurl, rdata) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('[isAxis] makes request to: ' + rurl);
        let response = (0, axios_1.default)({
            method: 'POST',
            url: rurl,
            data: Object.assign({}, rdata),
            headers: {
                'Content-Type': 'application/json',
                'X-Develop-Mode': 'yes'
            }
        })
            .then(resp => {
            console.log("[isAxis] Вошли в then: " + resp);
            return resp;
        })
            .catch(result => {
            if (result.response) {
                // Запрос был сделан, и сервер ответил кодом состояния, который
                // выходит за пределы 2xx
                console.log("[isAxios] Server returns error: " + result.response.status);
                return result.response;
            }
            else if (result.request) {
                // Запрос был сделан, но ответ не получен
                // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
                console.log("[isAxios] Bad request: " + result.response.status);
                return result;
            }
            else {
                // Произошло что-то при настройке запроса, вызвавшее ошибку
                console.error('[isAxios] Fatal error:', result.message);
                throw result;
            }
        });
        return response;
    });
}
exports.isAxis = isAxis;
