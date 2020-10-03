import axios, { AxiosResponse } from 'axios'

interface TrackerOptions {
    apiKey: string
}


export class TrackerClient {
    apiKey: string;
    constructor(options: TrackerOptions) {
        this.apiKey = options.apiKey
    }
    public async errorCheck(error: any) {
        switch (error.response.status) {
            case 401:
                throw new Error("API Token is invalid, please make sure it is correct");
            case 404:
                throw new Error("Username provided is non-existent on tracker.gg");
            case 429:
                throw new Error("You have hit a rate-limit, slow down")
        }
    }
    public async getApexProfileStats(platform: string, identifier: string, apiKey: string | undefined) {
        console.log(platform)
        if (!["origin", "xbl", "psn"].includes(platform)) throw new Error("Invalud platform provided")
        // @ts-ignore
        let response: AxiosResponse = await axios.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${identifier}`, {
            headers: { "TRN-Api-Key": this.apiKey }
        }).catch(error => {
            return this.errorCheck(error)
        });
        const { data: { data: { platformInfo, metadata, segments } } } = response
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
    public async getCSGOPlayerStats(identifier: string, apiKey: string | undefined) {
        // console.log(identifier);
        if (/(?<STEAMID64>[^\/][0-9]{8,})/.test(identifier)) {
            throw new Error("Not a valid Steam64ID")
        }
        //@ts-ignore
        let response: AxiosResponse = await axios.get(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${identifier}`, {
            headers: { "TRN-Api-Key": this.apiKey }
        }).catch(error => {
            return this.errorCheck(error)
        });
        const { data: { data: { platformInfo, segments } } } = response
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

    public async getOverwatchStats(platform: string, identifier: string, apiKey: string | undefined) {
        identifier.trim()
        if (!['psn', 'xbl'].includes(platform)) throw new Error('Invalid platform supplied!');
        //@ts-ignore
        let response: AxiosResponse = await axios.get(`https://public-api.tracker.gg/v2/overwatch/standard/profile/${platform}/${identifier}`, {
            headers: { 'TRN-Api-Key': this.apiKey }
        }).catch(err => {
            return this.errorCheck(err);
        });
        const { data: { data: { platformInfo, segments } } } = response
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

    public async getSplitStats(identifier: string, apiKey: string | undefined) {
        if (!/(?<STEAMID64>[^\/][0-9]{8,})/.test(identifier)) {
            throw new Error("Not a valid Steam64ID")
        }
        //@ts-ignore
        let response: AxiosResponse = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/steam/${identifier}`, {
            headers: { 'TRN-Api-Key': this.apiKey }
        }).catch(err => {
            return this.errorCheck(err);
        });
        const { data: { data: { platformInfo, segments } } } = response
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