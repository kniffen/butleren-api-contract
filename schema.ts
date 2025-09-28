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
    settings: GuildSettings.optional(),
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
const ChatRequestBody = z
  .object({ message: z.string() })
  .strict()
  .passthrough();
const User = z
  .object({
    id: z.string(),
    displayName: z.string(),
    lat: z.number().optional(),
    lon: z.number().optional(),
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
const LogEntry = z
  .object({
    id: z.string(),
    timestamp: z.string().datetime({ offset: true }),
    level: z.enum(["info", "warn", "error", "debug"]),
    message: z.string(),
    rest: z.array(z.string()).optional(),
  })
  .strict()
  .passthrough();
const TwitchChannel = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    url: z.string(),
    notificationChannelId: z.string(),
    notificationRoleId: z.string().optional(),
  })
  .strict()
  .passthrough();
const TwitchChannelRequestBody = z
  .object({
    id: z.string(),
    notificationChannelId: z.string(),
    notificationRoleId: z.string().optional(),
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
const KickChannel = z
  .object({
    broadcasterUserId: z.number(),
    name: z.string(),
    description: z.string().optional(),
    url: z.string(),
    notificationChannelId: z.string(),
    notificationRoleId: z.string().optional(),
  })
  .strict()
  .passthrough();
const KickChannelRequestBody = z
  .object({
    broadcasterUserId: z.number(),
    notificationChannelId: z.string(),
    notificationRoleId: z.string().optional(),
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
const UserDBEntry = z
  .object({
    id: z.string(),
    lat: z.number().optional(),
    lon: z.number().optional(),
  })
  .strict()
  .passthrough();
const ModuleDatabaseEntry = z
  .object({ guildId: z.string(), slug: z.string(), settings: z.string() })
  .strict()
  .passthrough();
const KickChannelDatabaseEntry = z
  .object({
    guildId: z.string(),
    broadcasterUserId: z.number(),
    notificationChannelId: z.string(),
    notificationRoleId: z.string().optional(),
  })
  .strict()
  .passthrough();

export const schemas = {
  GuildSettings,
  Guild,
  ChatRequestBody,
  User,
  ModuleSettings,
  Module,
  LogEntry,
  TwitchChannel,
  TwitchChannelRequestBody,
  TwitchSearchResultItem,
  KickChannel,
  KickChannelRequestBody,
  KickSearchResultItem,
  UserDBEntry,
  ModuleDatabaseEntry,
  KickChannelDatabaseEntry,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/api/discord/:channelId/chat",
    alias: "postApidiscordChannelIdchat",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ message: z.string() }).strict().passthrough(),
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
    path: "/api/discord/guilds/:guildId/settings",
    alias: "putApidiscordguildsGuildIdsettings",
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
    path: "/api/logger/entries",
    alias: "getApiloggerentries",
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
    path: "/api/modules/:guildId/:slug/settings",
    alias: "putApimodulesGuildIdSlugsettings",
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
    path: "/api/modules/kick/:guildId/channels",
    alias: "getApimoduleskickGuildIdchannels",
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
    path: "/api/modules/kick/:guildId/channels",
    alias: "postApimoduleskickGuildIdchannels",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: KickChannelRequestBody,
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
    path: "/api/modules/kick/:guildId/channels/:broadcasterUserId",
    alias: "deleteApimoduleskickGuildIdchannelsBroadcasterUserId",
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
    path: "/api/modules/kick/search",
    alias: "getApimoduleskicksearch",
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
    path: "/api/modules/twitch/:guildId/channels",
    alias: "getApimodulestwitchGuildIdchannels",
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
    path: "/api/modules/twitch/:guildId/channels",
    alias: "postApimodulestwitchGuildIdchannels",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: TwitchChannelRequestBody,
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
    path: "/api/modules/twitch/:guildId/channels/:channelId",
    alias: "deleteApimodulestwitchGuildIdchannelsChannelId",
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
    path: "/api/modules/twitch/:guildId/channels/search",
    alias: "getApimodulestwitchGuildIdchannelssearch",
    requestFormat: "json",
    parameters: [
      {
        name: "guildId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "query",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "type",
        type: "Query",
        schema: z.literal("channels"),
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
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
