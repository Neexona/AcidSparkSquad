const Command = require("../../modules/Command.js");
const { Client, RichEmbed } = require('discord.js');

class Report extends Command {
  constructor(client) {
    super(client, {
      name: "report",
      description: "Permet de report quelqu'un au staff.",
      usage: "report",
    });
  }

  async run(message) {
    let reportedUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );

    if (!reportedUser)
      return message.channel.send("L'utilisateur n'existe pas !");
      
    const messageArray = message.content.split(" ");
    const args = messageArray.slice(1);
    let reportedReason = args.join(" ").slice(22);

    let reportEmbed = new RichEmbed()
      .setDescription("Reports")
      .setColor("#dc143c")
      .addField("Joueur reporté :", `${reportedUser} (ID: ${reportedUser.id})`)
      .addField(
        "Joueur ayant reporté :",
        `${message.author} (ID: ${message.author.id})`
      )
      .addField("Channel", message.channel)
      .addField("Raison", reportedReason);

    let reportChannel = message.guild.channels.find(`name`, "reports");
    if (!reportChannel)
      return message.channel.send(
        "Le salon 'reports' est introuvable. Veuillez créer ce canal !"
      );

    message.delete();
    reportChannel.send(reportEmbed);
  };
}

module.exports = Report;