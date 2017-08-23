const Discord = require("discord.js");
const commando = require('discord.js-commando');

const TOKEN = "MzQ5OTE4Njc4MzIzNTYwNDUx.DH8evg._syuxUiYsZxevWxpNZcjkxPMK0k";
const PREFIX = ".";

var bot = new Discord.Client();
 
var servers = {};

bot.on("guildMemberAdd", function(member) {
   
    var welcome = new Discord.RichEmbed()
        .setColor(0x6dff71)
        .setAuthor("Hoşgeldin " + member.displayName, bot.user.avatarURL)
        .setDescription("Discord Sunucumuza Hoşgeldin" + member.toString() + ".Yardım İstersen Adminlere Ulaşabilirsin.")
        .setTimestamp()
   
    member.guild.channels.find("name", "welcome").sendEmbed(welcome);
   
    member.addRole(member.guild.roles.find("name", "Ciphers Networks Member"));
});

bot.on("message", function(message) {
    console.log(message.content);

});


bot.on("message", async message => {
          if(message.author.bot) return;
if(message.channel.type === "dm") return;

let messageArray = message.content.split(" ");
let command = messageArray[0];
let args = messageArray.slice(1);

if(!command.startsWith(PREFIX)) return;

if(command === `${PREFIX}userinfo`) {
    let embed = new Discord.RichEmbed()
         .setAuthor(message.author.username)
         .setDescription("Sorguladığınız Kişinin Bilgileri")
         .setColor("#9B59B6")
         .addField("Kullanıcı Adı", `${message.author.username}#${message.author.discriminator}`)
         .addField("ID", message.author.id)
         .addField("Kurulma Tarihi", message.author.createdAt);

    message.channel.sendEmbed(embed);
}
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    if (!message.content.startsWith(PREFIX)) return;
     
    var args = message.content.substring(PREFIX.length).split(" ");
   
    var argspassed = message.content.substring(PREFIX.length).split(" ").slice(1);
   
    var argmessage = argspassed.join(' ');
 
    switch (args[0].toLowerCase()) {
            
            case "yardım":
            var help = new Discord.RichEmbed()
                .setColor(0xFFFF00)
                .setAuthor("Ciphers Networks Yardım", message.author.avatarURL)
                .setDescription("Ciphers Networks Botumuzun Tüm Komutları")
                .addField(".ping", "Discord Sunucu Ping'ini Gösterir")
                .addField("Admin Komutları", "=======================")
                .addField(".purge <number>", "Belirlidiğiniz Miktarda Yazı Siler")
            message.channel.sendEmbed(help);
            //          message.channel.sendCode("asciidoc", "= Komut Listesi = \n\n!ping          :: Sunucudaki Pingi Göster")
            break;
        case "ping":
            message.channel.send(message.author.toString() + ` Ping: \`${Date.now() - message.createdTimestamp} ms\``);
            break;
        case "purge":
            if(!message.member.hasPermission("MANAGE_MESSAGES")) {
                message.channel.send(message.author.toString() + " Sohbeti Temizlemek İçin Yetkin Yeterli Değil");
            } else {
                if (args[1]){
                    let messagecount = args[1];
                    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
                    message.channel.send(" `" + messagecount + "` Mesaj Temizlendi.");
                } else {
                    message.channel.send("Kullanım: !purge (Miktar)");
                }
            }
            break;
    }   
});

bot.login(TOKEN);