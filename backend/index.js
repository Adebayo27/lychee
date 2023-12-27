import express from "express";
import cors from "cors";
const app = express();
const port = 2000
app.use(cors())
app.use(express.json());
import ffmpegStatic from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';
// const ffmpegStatic = require('ffmpeg-static');
// const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegStatic);

const inputPath = 'assets/template.mp4';
const outputPath = 'output-outro/output.mp4';
const scaleOptions = ['scale=9:16'];
const videoCodec = 'libx264';
const x264Options = 'keyint=24:min-keyint=24:no-scenecut';
const videoBitrates = ['1000k', '2000k', '4000k'];

function escape(s) {
    return ('' + s)
        .replace(/\\/g, '\\\\')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\u00A0/g, '\\u00A0')
        .replace(/&/g, '\\x26')
        .replaceAll("'", "\\'")
        .replace(/"/g, '\\x22')
        .replace(/</g, '\\x3C')
        .replace(/>/g, '\\x3E');
}

app.post("/create-brand-kit", async (req, res) => {
  try {
    const { name, callToAction, customCTA } = req.body;
    console.log(customCTA.replaceAll("'", "\'"))
    ffmpeg()
        .input(inputPath)
        .videoFilters(
            {
                filter: 'drawtext',
                options: {
                    fontfile:'assets/OpenSans-Regular.ttf',
                    text: customCTA.length > 0 ? customCTA.replaceAll("'", "\’") : callToAction,
                    fontsize: 32,
                    fontcolor: '#FF00F2',
                    x: '(main_w/2-text_w/2)',
                    y: 250,
                    shadowcolor: 'black',
                    shadowx: 2,
                    shadowy: 2,
                    enable: 'between(t,0,4)',
                }
            },
        )
        .videoCodec(videoCodec)
        .size('720x?').aspect('9:16')
        .addOption('-x264opts', x264Options)
        .outputOptions('-b:v', videoBitrates[0])
        .format('dash')
        .output(outputPath)
        .on('end', () => {
            console.log('DASH encoding complete.');
            res.status(201).json({
                message: req.body,
                status: true,
            });
        })
        .on('error', (err) => {
            console.error('Error:', err.message);
            res.status(500).json({
                message: err.message,
                status: false,
            });
        })
        .run();
   
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get('/', async(req, res) => {
    res.status(200).json({
        message: 'ping',
    });
})

app.listen(port, () => {
  console.log(`Server listening in http://localhost:${port}`);
});