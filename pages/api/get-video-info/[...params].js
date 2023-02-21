import ytdl from "ytdl-core";

export default async function handler(req, res) {
   const { params } = req.query;
   // console.log(params[params.length - 1]);

   const vidUrl = params[params.length - 1];
   const vidInfo = await ytdl.getBasicInfo(vidUrl);
   const vidFormat = await ytdl.getInfo(vidUrl);
   const { videoDetails } = vidInfo;

   const { formats } = vidFormat;

   let activeVidFormats = [];
   let activeAudFormats = [];
   for (let k = 0; k < formats.length; k++) {
      const vidFormat = formats[k];
      if (vidFormat.hasVideo === true && vidFormat.hasAudio === true) {
         activeVidFormats.push(vidFormat);
      } else if (vidFormat.hasVideo === false && vidFormat.hasAudio === true) {
         activeAudFormats.push(vidFormat);
      }
   }

   const data = { videoDetails, formats, activeVidFormats, activeAudFormats };
   res.json({ data });
}
