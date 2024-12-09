import { Button } from '@/components/ui/button'
import { Heading1, Type, Code, Video, Image, MousePointer, Table, Link, FootprintsIcon as FooterIcon, LayoutGrid, Share2, FormInput } from 'lucide-react'

interface SidebarProps {
  addBlock: (type: string) => void
}

export default function Sidebar({ addBlock }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-100 p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Blocks</h2>
      <div className="space-y-2 overflow-y-auto flex-grow">
        <Button onClick={() => addBlock('header')} className="w-full justify-start">
          <Heading1 className="mr-2" />
          Header
        </Button>
        <Button onClick={() => addBlock('paragraph')} className="w-full justify-start">
          <Type className="mr-2" />
          Paragraph
        </Button>
        <Button onClick={() => addBlock('html')} className="w-full justify-start">
          <Code className="mr-2" />
          HTML
        </Button>
        <Button onClick={() => addBlock('video')} className="w-full justify-start">
          <Video className="mr-2" />
          Video
        </Button>
        <Button onClick={() => addBlock('image')} className="w-full justify-start">
          <Image className="mr-2" />
          Image
        </Button>
        <Button onClick={() => addBlock('button')} className="w-full justify-start">
          <MousePointer className="mr-2" />
          Button
        </Button>
        <Button onClick={() => addBlock('table')} className="w-full justify-start">
          <Table className="mr-2" />
          Table
        </Button>
        <Button onClick={() => addBlock('link')} className="w-full justify-start">
          <Link className="mr-2" />
          Link
        </Button>
        <Button onClick={() => addBlock('footer')} className="w-full justify-start">
          <FooterIcon className="mr-2" />
          Footer
        </Button>
        <Button onClick={() => addBlock('card')} className="w-full justify-start">
          <LayoutGrid className="mr-2" />
          Card
        </Button>
        <Button onClick={() => addBlock('social')} className="w-full justify-start">
          <Share2 className="mr-2" />
          Social
        </Button>
        <Button onClick={() => addBlock('form')} className="w-full justify-start">
          <FormInput className="mr-2" />
          Form
        </Button>
      </div>
    </div>
  )
}

