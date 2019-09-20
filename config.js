const config = {
  defaultSettings: {
    prefix: "ac!",
    modLogChannel: "logs",
    modRole: "L'acide Modolide",
    adminRole: "L'acide Adminique",
    creaRole: "L'acide Créatylique",
    systemNotice: true
  },
  permLevels: [
    { level: 0, name: "Utilisateur", check: () => true },
    {
      level: 1,
      name: "L'acide Modolide",
      check: message => {
        try {
          const modRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.modRole.toLowerCase()
          );
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 2,
      name: "L'acide Adminique",
      check: message => {
        try {
          const adminRole = message.guild.roles.find(
            r =>
              r.name.toLowerCase() === message.settings.adminRole.toLowerCase()
          );
          if (adminRole && message.member.roles.has(adminRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
{
      level: 3,
      name: "L'acide Créatylique",
      check: message => {
        try {
          const creaRole = message.guild.roles.find(
            r =>
              r.name.toLowerCase() === message.settings.creaRole.toLowerCase()
          );
          if (creaRole && message.member.roles.has(creaRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    }
  ]
};

module.exports = config;
