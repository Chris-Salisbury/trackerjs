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
    async errorCheck(error) {
        switch (error.response.status) {
            case 401:
                throw new Error("API Token is invalid, please make sure it is correct");
            case 404:
                throw new Error("Username provided is non-existent on tracker.gg");
            case 429:
                throw new Error("You have hit a rate-limit, slow down");
        }
    }
    async getApexProfileStats(platform, identifier, apiKey) {
        console.log(platform);
        if (!["origin", "xbl", "psn"].includes(platform))
            throw new Error("Invalud platform provided");
        // @ts-ignore
        let response = await axios_1.default.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${identifier}`, {
            headers: { "TRN-Api-Key": this.apiKey }
        }).catch(error => {
            return this.errorCheck(error);
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
    async getCSGOPlayerStats(identifier, apiKey) {
        // console.log(identifier);
        if (/(?<STEAMID64>[^\/][0-9]{8,})/.test(identifier)) {
            throw new Error("Not a valid Steam64ID");
        }
        //@ts-ignore
        let response = await axios_1.default.get(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${identifier}`, {
            headers: { "TRN-Api-Key": this.apiKey }
        }).catch(error => {
            return this.errorCheck(error);
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
    async getOverwatchStats(platform, identifier, apiKey) {
        identifier.trim();
        if (!['psn', 'xbl'].includes(platform))
            throw new Error('Invalid platform supplied!');
        //@ts-ignore
        let response = await axios_1.default.get(`https://public-api.tracker.gg/v2/overwatch/standard/profile/${platform}/${identifier}`, {
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
    async getSplitStats(identifier, apiKey) {
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
