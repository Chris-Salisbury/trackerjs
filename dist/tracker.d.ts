interface TrackerOptions {
    apiKey: string;
}
export declare class TrackerClient {
    apiKey: string;
    constructor(options: TrackerOptions);
    errorCheck(error: any): void;
    /**
     * @param {string} platform The platform of the user you are trying to lookup e.g origin, psn, xbl
     * @param {string} identifier The username of the person you are trying to look up.
     */
    getApexPlayerStats(platform: string, identifier: string): Promise<{
        data: {
            pInfo: {
                platform: any;
                platformUserID: any;
                platformUserHandle: any;
                avatarURL: any;
            };
            metadata: any;
            segments: any;
        };
    }>;
    /**
     * @param {string} identifier The SteamID64 of the user you are looking up stats for
     */
    getCSGOPlayerStats(identifier: string): Promise<{
        data: {
            pInfo: {
                platform: any;
                platformUserID: any;
                platformUserHandle: any;
                avatarURL: any;
            };
            segments: any;
        };
    }>;
    /**
     * @param {string} platform The platform of the user you are trying to lookup, e.g psn, xbl (Battlenet not yet supported)
     * @param {string} identifier The Username of the person you are trying to look up.
     */
    getOverwatchPlayerStats(platform: string, identifier: string): Promise<{
        data: {
            pInfo: {
                platform: any;
                platformUserID: any;
                platformUserHandle: any;
                avatarURL: any;
            };
            segments: any;
        };
    }>;
    /**
     * @param {string} identifier The SteamID64 of the user you are trying to lookup
     */
    getSplitPlayerStats(identifier: string): Promise<{
        data: {
            pInfo: {
                platform: any;
                platformUserID: any;
                platformUserHandle: any;
                avatarURL: any;
            };
            segments: any;
        };
    }>;
}
export {};
