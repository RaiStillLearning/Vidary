export interface ServerItem {
  serverId: string;
  title: string;
  href: string;
}

export interface Quality {
  title: string;
  serverList: ServerItem[];
}

export interface EpisodeData {
  title: string;
  defaultStreamingUrl?: string;
  server?: {
    qualities?: Quality[];
  };
}

export interface EpisodeResponse {
  status: string;
  data: EpisodeData | null;
}
