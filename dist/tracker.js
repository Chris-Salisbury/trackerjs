"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerClient = void 0;
const axios_1 = __importDefault(require("axios"));
class TrackerClient {
    constructor(options) {
        this.apiKey = options.apiKey;
    }
    errorCheck(error) {
        switch (error.response.status) {
            case 401:
                throw new Error("API Key invalid");
            case 451:
                throw new Error("Invalid parameters supplied");
            case 404:
                throw new Error("Username provided is non-existent on tracker.gg");
            case 429:
                throw new Error("You have hit a rate-limit, slow down");
            case 503:
                throw new Error("The request has been stopped, tracker.gg is either down for maitnance or overloaded");
            case 400:
                throw new Error("Bad request, you are probably not supplying a correct username or ID");
        }
    }
    /**
     * @param {string} platform The platform of the user you are trying to lookup e.g origin, psn, xbl
     * @param {string} identifier The username of the person you are trying to look up.
     */
    async getApexPlayerStats(platform, identifier) {
        if (!["origin", "xbl", "psn"].includes(platform))
            throw new Error("Invalid platform provided");
        // @ts-ignore
        let response = await axios_1.default.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${identifier}`, {
            headers: { "TRN-Api-Key": this.apiKey }
        }).catch(err => {
            return this.errorCheck(err);
        });
        const { data: { data: { platformInfo, metadata, segments } } } = response;
        return {
            data: {
                pInfo: {
                    platform: platformInfo.platformSlug,
                    platformUserID: platformInfo.platformUserId,
                    platformUserHandle: platformInfo.platformUserHandle,
                    avatarURL: platformInfo.avatarUrl
                },
                metadata,
                segments
            }
        };
    }
    /**
     * @param {string} identifier The SteamID64 of the user you are looking up stats for
     */
    async getCSGOPlayerStats(identifier) {
        //@ts-ignore
        if (!/(?<STEAMID64>[^\/][0-9]{8,})/.test(identifier)) {
            throw new Error("Not a valid Steam64ID");
        }
        //@ts-ignore
        let response = await axios_1.default.get(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${identifier}`, {
            headers: { "TRN-Api-Key": this.apiKey }
        }).catch(err => {
            return this.errorCheck(err);
        });
        const { data: { data: { platformInfo, segments } } } = response;
        return {
            data: {
                pInfo: {
                    platform: platformInfo.platformSlug,
                    platformUserID: platformInfo.platformUserId,
                    platformUserHandle: platformInfo.platformUserHandle,
                    avatarURL: platformInfo.avatarUrl
                },
                segments
            }
        };
    }
    /**
     * @param {string} platform The platform of the user you are trying to lookup, e.g psn, xbl (Battlenet not yet supported)
     * @param {string} identifier The Username of the person you are trying to look up.
     */
    async getOverwatchPlayerStats(platform, identifier) {
        if (!['battlenet', 'psn', 'xbl'].includes(platform))
            throw new Error('Invalid platform supplied!');
        if (platform === "battlenet" && /(^([A-zÀ-ú][A-zÀ-ú0-9]{2,11})|(^([а-яёА-ЯЁÀ-ú][а-яёА-ЯЁ0-9À-ú]{2,11})))(#[0-9]{4,})$/.test(identifier)) {
            throw new Error("Battlent is having issues, please use the other methods");
        }
        //@ts-ignore
        let response = await axios_1.default.get(`https://public-api.tracker.gg/v2/overwatch/standard/profile/${platform}/${identifier}`, {
            headers: { 'TRN-Api-Key': this.apiKey }
        }).catch(err => {
            console.log(err);
            return this.errorCheck(err);
        });
        const { data: { data: { platformInfo, segments } } } = response;
        return {
            data: {
                pInfo: {
                    platform: platformInfo.platformSlug,
                    platformUserID: platformInfo.platformUserId,
                    platformUserHandle: platformInfo.platformUserHandle,
                    avatarURL: platformInfo.avatarUrl
                },
                segments
            }
        };
    }
    /**
     * @param {string} identifier The SteamID64 of the user you are trying to lookup
     */
    async getSplitPlayerStats(identifier) {
        if (!/(?<STEAMID64>[^\/][0-9]{8,})/.test(identifier)) {
            throw new Error("Not a valid Steam64ID");
        }
        //@ts-ignore
        let response = await axios_1.default.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/steam/${identifier}`, {
            headers: { 'TRN-Api-Key': this.apiKey }
        }).catch(err => {
            return this.errorCheck(err);
        });
        const { data: { data: { platformInfo, segments } } } = response;
        return {
            data: {
                pInfo: {
                    platform: platformInfo.platformSlug,
                    platformUserID: platformInfo.platformUserId,
                    platformUserHandle: platformInfo.platformUserHandle,
                    avatarURL: platformInfo.avatarUrl
                },
                segments
            }
        };
    }
}
exports.TrackerClient = TrackerClient;
