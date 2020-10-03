import axios, { AxiosResponse } from 'axios'

interface TrackerOptions {
    apiKey: string | undefined
}

export class TrackerClient {
    apiKey: string | undefined;
    constructor(options: TrackerOptions) {
        this.apiKey = options.apiKey || "";
    }
    public errorCheck(error: any) {
        switch (error.response.status) {
            case 401:
                throw new Error("API Token is invalid, please make sure it is correct");
            case 451:
                throw new Error("Invalid parameters supplied");
            case 404:
                throw new Error("Username provided is non-existent on tracker.gg");
            case 429:
                throw new Error("You have hit a rate-limit, slow down")
        }
    }

    /*
    * @param {string} Platform - The platform of the account you are trying to lookup
    * @param {string} platformUserIdentifier - The User Identifier e.g username, ID, etc linked to the user on specific platform you are requesting
    * */

    public async getApexPlayerStats(platform: string, identifier: string) {
        if (!["origin", "xbl", "psn"].includes(platform)) throw new Error("Invalid platform provided");
        // @ts-ignore
        let response: AxiosResponse = await axios.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${identifier}`, {
            headers: { "TRN-Api-Key": this.apiKey }
        }).catch(error => {
            return this.errorCheck(error)
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
        }
    }
    /*
    * @param {string} identifier - Identifier of the user you are looking up e.g SteamID64
    * */
    public async getCSGOPlayerStats(identifier: string) {
        //@ts-ignore
        if (/(?<STEAMID64>[^\/][0-9]{8,})/.test(identifier)) {
            throw new Error("Not a valid Steam64ID")
        }
        //@ts-ignore
        let response: AxiosResponse = await axios.get(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${identifier}`, {
            headers: { "TRN-Api-Key": this.apiKey }
        }).catch(error => {
            return this.errorCheck(error)
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
        }
    }

    /*
    * @param {string} Platform - Platform for the profile you are looking up. Options: psn, xbl
    * @param {string} Identifier - Identifier of the user you are looking up e.g psn name or xbox gamertag
    * */

    public async getOverwatchPlayerStats(platform: string, identifier: string) {
        if (!['psn', 'xbl'].includes(platform)) throw new Error('Invalid platform supplied!');
        //@ts-ignore
        let response: AxiosResponse = await axios.get(`https://public-api.tracker.gg/v2/overwatch/standard/profile/${platform}/${identifier}`, {
            headers: { 'TRN-Api-Key': this.apiKey }
        }).catch(err => {
            this.errorCheck(err);
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
        }
    }

    /*
    * @param {string} Identifier - Identifier of the user you are looking up e.g SteamID64
    * */

    public async getSplitPlayerStats(identifier: string) {
        if (/(?<STEAMID64>[^\/][0-9]{8,})/.test(identifier)) {
            throw new Error("Not a valid Steam64ID")
        }
        //@ts-ignore
        let response: AxiosResponse = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/steam/${identifier}`, {
            headers: { 'TRN-Api-Key': this.apiKey }
        }).catch(err => {
            this.errorCheck(err);
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
        }
    }
}