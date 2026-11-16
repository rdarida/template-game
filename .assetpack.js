import { audio } from '@assetpack/core/ffmpeg';
import { texturePacker } from '@assetpack/core/texture-packer';
import { webfont } from '@assetpack/core/webfont';
import { json } from '@assetpack/core/json';

export default {
  entry: './resources',
  output: './public/assets',
  pipes: [
    audio({ outputs: [{ formats: ['.mp3'] }] }),
    texturePacker({
      texturePacker: {
        removeFileExtension: true
      },
      resolutionOptions: { resolutions: { default: 1 } }
    }),
    webfont(),
    json()
  ]
};
