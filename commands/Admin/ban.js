const Command = require("../../modules/Command.js");
const { Client, RichEmbed } = require("discord.js");

class Ban extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      description: "Ban un membre !",
      usage: "ban",
      permLevel: "L'acide Adminique",
      category: "Administration"
    });
  }

  run(message, args) {
    let bannedUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    if (!bannedUser) return message.channel.send("L'utilisateur n'existe pas !");
    let bannedReason = args.join(" ").slice(22);

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send("Vous n'avez pas les permissions.");

    if (bannedUser.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send("Vous ne pouvez pas kick cette personne.");

    let banEmbed = new RichEmbed()
      .setDescription("Bans")
      .setColor("#dc143c")
      .addField("Joueur ban", `${bannedUser} (ID: ${bannedUser.id})`)
      .addField(
        "Joueur ayant ban",
        `${message.author} (ID: ${message.author.id})`
      )
      .addField("Channel", message.channel)
      .addField("Raison", bannedReason);

    let banChannel = message.guild.channels.find(`name`, "reports");
    if (!banChannel)
      return message.channel.send(
        "Le salon 'reports' est introuvable. Veuillez créer ce canal !"
      );

    message.delete();
    message.guild.member(bannedUser).ban(bannedReason);
    banChannel.send(banEmbed);
    message.channel.send(`<@${bannedUser.id}> à été warn ! Raison : `, bannedReason);
  };
}

module.exports = Ban;
