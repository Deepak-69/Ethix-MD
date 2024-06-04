import axios from 'axios';

const stickerCommands = ['cry', 'kiss', 'kill', 'kick'];

const stickerCommandHandler = async (m, gss) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  
  if (stickerCommands.includes(cmd)) {
    try {
      const { data } = await axios.get(`https://api.waifu.pics/sfw/${cmd}`);
      if (data && data.url) {
        gss.sendImageAsSticker(m.chat, data.url, m, { packname: "", author: "" });
      } else {
        m.reply('Error fetching sticker.');
      }
    } catch (error) {
      console.error('Error fetching sticker:', error);
      m.reply('Error fetching sticker.');
    }
  }
};

export default stickerCommandHandler;