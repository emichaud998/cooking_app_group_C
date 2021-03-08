"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
function getMemes() {
    axios_1.default
        .get("https://meme-api.herokuapp.com/gimme/50")
        .then(function (res) {
        console.log(res.data.memes
            .filter(function (meme) {
            return meme.ups >= 10000;
        })
            .map(function (meme) { return ({
            title: meme.title,
            url: meme.postLink,
        }); }));
    })
        .catch(function (error) {
        console.log(error);
    });
}
getMemes();
