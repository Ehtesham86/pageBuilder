export interface Block {
  id: number
  type: string
  content: string
  styles: {
    default: any
    mediaQueries: any
  }
  videoUrl?: string
  videoType?: 'url' | 'youtube' | 'vimeo'
}

