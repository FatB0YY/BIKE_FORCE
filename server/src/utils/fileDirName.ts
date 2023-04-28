import { fileURLToPath } from 'url'
import { dirname } from 'path'

export default function fileDirName(meta: any) {
  const __filename = fileURLToPath(meta.url)
  const __dirname = dirname(__filename)
  return { __dirname, __filename }
}