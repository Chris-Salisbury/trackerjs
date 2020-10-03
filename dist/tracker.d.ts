interface TrackerOptions {
    apiKey: string;
}
export declare class TrackerClient {
    apiKey: string;
    constructor(options: TrackerOptions);
    errorCheck(error: any): void;
    getApexStats(platform: string, identifier: string): Promise<{
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
    getCSGOStats(identifier: string): Promise<{
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
    getOverwatchStats(platform: string, identifier: string): Promise<{
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
    getSplitStats(identifier: string): Promise<{
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
