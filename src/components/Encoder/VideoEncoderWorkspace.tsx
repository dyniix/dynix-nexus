import EncoderWorkspace from './EncoderWorkspace'
import { videoConfig } from './encoder-configs'

export default function VideoEncoderWorkspace() {
  return <EncoderWorkspace config={videoConfig} />
}
