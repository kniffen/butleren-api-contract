import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const GuildSettings = z
  .object({ nickname: z.string().optional(), color: z.string() })
  .strict()
  .passthrough();
const Guild = z
  .object({
    id: z.string(),
    name: z.string(),
    iconURL: z.string().nullable(),
    settings: GuildSettings,
    channels: z
      .array(
        z
          .object({
            id: z.string(),
            name: z.string(),
            type: z.enum(["ANNOUNCEMENT", "TEXT", "VOICE", "CATEGORY"]),
          })
          .partial()
          .strict()
          .passthrough()
      )
      .optional(),
    roles: z
      .array(
        z
          .object({ id: z.string(), name: z.string() })
          .partial()
          .strict()
          .passthrough()
      )
      .optional(),
  })
  .strict()
  .passthrough();
const _0 = z
  .object({ lat: z.number(), lon: z.number() })
  .partial()
  .strict()
  .passthrough();
const User = z
  .object({ id: z.string(), displayName: z.string(), settings: _0 })
  .strict()
  .passthrough();
const LogEntry = z
  .object({
    id: z.string(),
    timestamp: z.string().datetime({ offset: true }),
    level: z.enum(["info", "warn", "error", "debug"]),
    service: z.string().optional(),
    message: z.string(),
    rest: z.array(z.string()).optional(),
  })
  .strict()
  .passthrough();
const ModuleSettings = z
  .object({ isEnabled: z.boolean() })
  .strict()
  .passthrough();
const Module = z
  .object({
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    isLocked: z.boolean(),
    settings: ModuleSettings,
  })
  .strict()
  .passthrough();
const Command = z
  .object({
    slug: z.string(),
    description: z.string(),
    isLocked: z.boolean(),
    isEnabled: z.boolean(),
  })
  .strict()
  .passthrough();
const CommandSettings = z
  .object({ isEnabled: z.boolean() })
  .strict()
  .passthrough();
const TwitchNotificationConfig = z
  .object({
    id: z.string(),
    notificationChannelId: z.string(),
    notificationRoleId: z.string().optional(),
  })
  .strict()
  .passthrough();
const TwitchChannel = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    url: z.string(),
    notificationConfig: TwitchNotificationConfig,
  })
  .strict()
  .passthrough();
const TwitchSearchResultItem = z
  .object({
    id: z.string(),
    broadcaster_login: z.string(),
    display_name: z.string(),
    broadcaster_language: z.string(),
    game_id: z.string(),
    game_name: z.string(),
    is_live: z.boolean(),
    thumbnail_url: z.string(),
    title: z.string(),
    started_at: z.string().datetime({ offset: true }),
    tag_ids: z.array(z.string()),
    tags: z.array(z.string()),
  })
  .strict()
  .passthrough();
const KickNotificationConfig = z
  .object({
    broadcasterUserId: z.number(),
    notificationChannelId: z.string(),
    notificationRoleId: z.string().optional(),
  })
  .strict()
  .passthrough();
const KickChannel = z
  .object({
    broadcasterUserId: z.number(),
    name: z.string(),
    description: z.string().optional(),
    url: z.string(),
    notificationConfig: KickNotificationConfig,
  })
  .strict()
  .passthrough();
const KickSearchResultItem = z
  .object({
    broadcaster_user_id: z.number(),
    slug: z.string(),
    channel_description: z.string(),
    stream_title: z.string(),
    banner_picture: z.string(),
    category: z
      .object({ id: z.string(), name: z.string(), thumbnail: z.string() })
      .strict()
      .passthrough(),
    stream: z
      .object({
        url: z.string(),
        is_live: z.boolean(),
        is_mature: z.boolean(),
        language: z.string(),
        start_time: z.string().datetime({ offset: true }),
        viewer_count: z.number().int(),
        thumbnail: z.string(),
      })
      .strict()
      .passthrough(),
  })
  .strict()
  .passthrough();
const YouTubeNotificationConfig = z
  .object({
    channelId: z.string(),
    includeLiveStreams: z.boolean().default(false),
    notificationChannelId: z.string(),
    notificationRoleId: z.string().nullable(),
  })
  .strict()
  .passthrough();
const YouTubeChannel = z
  .object({
    channelId: z.string(),
    name: z.string(),
    notificationConfig: YouTubeNotificationConfig,
  })
  .strict()
  .passthrough();
const YouTubeSearchResultItem = z
  .object({ channelId: z.string(), name: z.string(), imageURL: z.string() })
  .strict()
  .passthrough();
const SpotifyNotificationConfig = z
  .object({
    showId: z.string(),
    notificationChannelId: z.string(),
    notificationRoleId: z.string().optional(),
  })
  .strict()
  .passthrough();
const SpotifyShow = z
  .object({
    showId: z.string(),
    name: z.string(),
    notificationConfig: SpotifyNotificationConfig,
  })
  .strict()
  .passthrough();
const SpotifySearchResultItem = z
  .object({ showId: z.string(), name: z.string(), imageURL: z.string() })
  .strict()
  .passthrough();
const GuildDBEntry = GuildSettings.and(
  z.object({ id: z.string() }).strict().passthrough()
);
const ChatRequestBody = z
  .object({ message: z.string() })
  .strict()
  .passthrough();
const UserDBEntry = z
  .object({ lat: z.number(), lon: z.number() })
  .partial()
  .strict()
  .passthrough()
  .and(z.object({ id: z.string() }).strict().passthrough());
const ModuleDBEntry = z
  .object({
    guildId: z.string(),
    slug: z.string(),
    isEnabled: z.union([z.literal(0), z.literal(1)]),
  })
  .strict()
  .passthrough();
const CommandDBEntry = z
  .object({
    guildId: z.string(),
    slug: z.string(),
    isEnabled: z.union([z.literal(0), z.literal(1)]),
  })
  .strict()
  .passthrough();
const id = z.string();
const TwitchChannelDBEntry = TwitchNotificationConfig.and(
  z.object({ guildId: id }).strict().passthrough()
);
const KickChannelDBEntry = KickNotificationConfig.and(
  z.object({ guildId: id }).strict().passthrough()
);
const YouTubeChannelDBEntry = z
  .object({
    channelId: z.string(),
    guildId: id,
    includeLiveStreams: z.union([z.literal(0), z.literal(1)]),
    notificationChannelId: z.string(),
    notificationRoleId: z.string().nullable(),
  })
  .strict()
  .passthrough();
const SpotifyShowDBEntry = SpotifyNotificationConfig.and(
  z.object({ guildId: id }).strict().passthrough()
);

export const schemas = {
  GuildSettings,
  Guild,
  _0,
  User,
  LogEntry,
  ModuleSettings,
  Module,
  Command,
  CommandSettings,
  TwitchNotificationConfig,
  TwitchChannel,
  TwitchSearchResultItem,
  KickNotificationConfig,
  KickChannel,
  KickSearchResultItem,
  YouTubeNotificationConfig,
  YouTubeChannel,
  YouTubeSearchResultItem,
  SpotifyNotificationConfig,
  SpotifyShow,
  SpotifySearchResultItem,
  GuildDBEntry,
  ChatRequestBody,
  UserDBEntry,
  ModuleDBEntry,
  CommandDBEntry,
  id,
  TwitchChannelDBEntry,
  KickChannelDBEntry,
  YouTubeChannelDBEntry,
  SpotifyShowDBEntry,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/api/commands/:guildId",
    alias: "getApicommandsGuildId",
    requestFormat: "json",
    parameters: [
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.array(Command),
    errors: [
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "put",
    path: "/api/commands/:name/:guildId",
    alias: "putApicommandsNameGuildId",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ isEnabled: z.boolean() }).strict().passthrough(),
      },
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "name",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Command not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/commands/:name/:guildId/restore",
    alias: "postApicommandsNameGuildIdrestore",
    requestFormat: "json",
    parameters: [
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "name",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Command not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/discord/guilds",
    alias: "getApidiscordguilds",
    requestFormat: "json",
    response: z.array(Guild),
    errors: [
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/discord/guilds/:guildId",
    alias: "getApidiscordguildsGuildId",
    requestFormat: "json",
    parameters: [
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Guild,
    errors: [
      {
        status: 404,
        description: `Guild not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "put",
    path: "/api/discord/guilds/:guildId",
    alias: "putApidiscordguildsGuildId",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: GuildSettings,
      },
      {
        name: "guild",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Guild not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/kick/:guildId/channels",
    alias: "getApikickGuildIdchannels",
    requestFormat: "json",
    parameters: [
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.array(KickChannel),
    errors: [
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/kick/:guildId/channels",
    alias: "postApikickGuildIdchannels",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: KickNotificationConfig,
      },
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Channel not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/api/kick/:guildId/channels/:broadcasterUserId",
    alias: "deleteApikickGuildIdchannelsBroadcasterUserId",
    requestFormat: "json",
    parameters: [
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "broadcasterUserId",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Channel not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/kick/search",
    alias: "getApikicksearch",
    requestFormat: "json",
    parameters: [
      {
        name: "query",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.array(KickSearchResultItem),
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/logs",
    alias: "getApilogs",
    requestFormat: "json",
    parameters: [
      {
        name: "date",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.array(LogEntry),
  },
  {
    method: "get",
    path: "/api/modules/:guildId",
    alias: "getApimodulesGuildId",
    requestFormat: "json",
    parameters: [
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.array(Module),
    errors: [
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "put",
    path: "/api/modules/:slug/:guildId",
    alias: "putApimodulesSlugGuildId",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ isEnabled: z.boolean() }).strict().passthrough(),
      },
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "slug",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Module not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/spotify/:guildId/shows",
    alias: "getApispotifyGuildIdshows",
    requestFormat: "json",
    parameters: [
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.array(SpotifyShow),
    errors: [
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/spotify/:guildId/shows",
    alias: "postApispotifyGuildIdshows",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: SpotifyNotificationConfig,
      },
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Channel not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/api/spotify/:guildId/shows/:showId",
    alias: "deleteApispotifyGuildIdshowsShowId",
    requestFormat: "json",
    parameters: [
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "showId",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Channel not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/spotify/search",
    alias: "getApispotifysearch",
    requestFormat: "json",
    parameters: [
      {
        name: "query",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.array(SpotifySearchResultItem),
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/twitch/:guildId/channels",
    alias: "getApitwitchGuildIdchannels",
    requestFormat: "json",
    parameters: [
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.array(TwitchChannel),
    errors: [
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/twitch/:guildId/channels",
    alias: "postApitwitchGuildIdchannels",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: TwitchNotificationConfig,
      },
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Channel not found&#x27;`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/api/twitch/:guildId/channels/:channelId",
    alias: "deleteApitwitchGuildIdchannelsChannelId",
    requestFormat: "json",
    parameters: [
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "channelId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Channel not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/twitch/search",
    alias: "getApitwitchsearch",
    requestFormat: "json",
    parameters: [
      {
        name: "query",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.array(TwitchSearchResultItem),
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/users",
    alias: "getApiusers",
    requestFormat: "json",
    response: z.array(User),
    errors: [
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/youtube/:guildId/channels",
    alias: "getApiyoutubeGuildIdchannels",
    requestFormat: "json",
    parameters: [
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.array(YouTubeChannel),
    errors: [
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/youtube/:guildId/channels",
    alias: "postApiyoutubeGuildIdchannels",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: YouTubeNotificationConfig,
      },
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Channel not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/api/youtube/:guildId/channels/:channelId",
    alias: "deleteApiyoutubeGuildIdchannelsChannelId",
    requestFormat: "json",
    parameters: [
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "channelId",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Channel not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/youtube/search",
    alias: "getApiyoutubesearch",
    requestFormat: "json",
    parameters: [
      {
        name: "query",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.array(YouTubeSearchResultItem),
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
