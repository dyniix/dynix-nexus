import EncoderWorkspace from './EncoderWorkspace'
import { audioConfig } from './encoder-configs'

export default function AudioEncoderWorkspace() {
  return <EncoderWorkspace config={audioConfig} />
}
