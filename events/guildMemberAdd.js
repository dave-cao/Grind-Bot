module.exports = {
  name: 'guildMemberAdd',
  once: false,
  execute(member) {
    member.send(
      '**Hello! Welcome to Grind Time**! \n'
        + 'Grind Time is a server meant to facilitate a community that supports accountability and productivity. \n'
        + 'We encourage this through gamification! There are many features that you can test and try out like a **leveling system** and a **streaks system**. \n'
        + "If you don't want to read the tutorial in the beginning, you can also watch the short video below to get a handle of everything on Grind Time. \n\n"
        + 'Have fun grinding, I look forward to seeing you on the other side! ~ David (Cow) '
        + '```The more you grind, the higher the level. The current highest is the Grindmaster Supreme...till this day, none has yet to achieve this feat. Can you?``` \n'
        + 'https://youtu.be/FRBrVgeM1d8',
    );
  },
};
