import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface TemplatesModalProps {
  isOpen: boolean
  onClose: () => void
  onInsertTemplate: (template: any) => void
}

const templates = [
  {
    id: 1,
    name: "Newsletter Template 1",
    content: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #333;">Newsletter Title</h1>
        <p style="color: #666;">Welcome to our newsletter! Here's the latest update.</p>
        <h2 style="color: #333;">Main Article</h2>
        <p style="color: #666;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod, nunc sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet lorem.</p>
        <div style="margin-top: 20px;">
          <a href="#" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Read More</a>
        </div>
        <div style="margin-top: 20px;">
          <a href="#" style="margin-right: 10px;"><img src="https://via.placeholder.com/30" alt="Facebook" /></a>
          <a href="#" style="margin-right: 10px;"><img src="https://via.placeholder.com/30" alt="Twitter" /></a>
          <a href="#"><img src="https://via.placeholder.com/30" alt="LinkedIn" /></a>
        </div>
        <form action="https://munkpin.onrender.com/api/submit/your_user_ID" method="POST" enctype="application/x-www-form-urlencoded" style="margin-top: 20px;">
          <input type="hidden" name="campaign" value="vlogger" />
          <input type="hidden" name="redirectUrl" value="your_redirectURL" />
          <div style="margin-bottom: 10px;">
            <label for="name" style="display: block; margin-bottom: 5px;">Name:</label>
            <input type="text" id="name" name="name" style="width: 100%; padding: 5px; border: 1px solid #ccc; border-radius: 3px;" />
          </div>
          <div style="margin-bottom: 10px;">
            <label for="email" style="display: block; margin-bottom: 5px;">Email:</label>
            <input type="email" id="email" name="email" style="width: 100%; padding: 5px; border: 1px solid #ccc; border-radius: 3px;" />
          </div>
          <div style="margin-bottom: 10px;">
            <label for="message" style="display: block; margin-bottom: 5px;">Message:</label>
            <textarea id="message" name="message" style="width: 100%; padding: 5px; border: 1px solid #ccc; border-radius: 3px; height: 100px;"></textarea>
          </div>
          <button type="submit" style="background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Submit</button>
        </form>
      </div>
    `
  },
  {
    id: 2,
    name: "Newsletter Template 2",
    content: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Helvetica', sans-serif; background-color: #f0f0f0;">
        <h1 style="color: #2c3e50; text-align: center;">Monthly Newsletter</h1>
        <div style="background-color: white; padding: 20px; border-radius: 5px;">
          <h2 style="color: #2c3e50;">Featured Story</h2>
          <p style="color: #34495e;">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
          <a href="#" style="display: inline-block; background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 3px;">Continue Reading</a>
        </div>
        <div style="margin-top: 20px; text-align: center;">
          <a href="#" style="margin-right: 10px;"><img src="https://via.placeholder.com/40" alt="Facebook" style="border-radius: 50%;" /></a>
          <a href="#" style="margin-right: 10px;"><img src="https://via.placeholder.com/40" alt="Twitter" style="border-radius: 50%;" /></a>
          <a href="#"><img src="https://via.placeholder.com/40" alt="Instagram" style="border-radius: 50%;" /></a>
        </div>
        <form action="https://munkpin.onrender.com/api/submit/your_user_ID" method="POST" enctype="application/x-www-form-urlencoded" style="margin-top: 20px; background-color: white; padding: 20px; border-radius: 5px;">
          <input type="hidden" name="campaign" value="vlogger" />
          <input type="hidden" name="redirectUrl" value="your_redirectURL" />
          <div style="margin-bottom: 15px;">
            <label for="name" style="display: block; margin-bottom: 5px; color: #2c3e50;">Name:</label>
            <input type="text" id="name" name="name" style="width: 100%; padding: 8px; border: 1px solid #bdc3c7; border-radius: 3px;" />
          </div>
          <div style="margin-bottom: 15px;">
            <label for="email" style="display: block; margin-bottom: 5px; color: #2c3e50;">Email:</label>
            <input type="email" id="email" name="email" style="width: 100%; padding: 8px; border: 1px solid #bdc3c7; border-radius: 3px;" />
          </div>
          <div style="margin-bottom: 15px;">
            <label for="message" style="display: block; margin-bottom: 5px; color: #2c3e50;">Message:</label>
            <textarea id="message" name="message" style="width: 100%; padding: 8px; border: 1px solid #bdc3c7; border-radius: 3px; height: 100px;"></textarea>
          </div>
          <button type="submit" style="background-color: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 3px; cursor: pointer;">Submit</button>
        </form>
      </div>
    `
  }
]

const TemplatesModal: React.FC<TemplatesModalProps> = ({ isOpen, onClose, onInsertTemplate }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Newsletter Templates</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
              <div className="mb-4 h-40 overflow-y-auto border p-2 rounded">
                <div dangerouslySetInnerHTML={{ __html: template.content }} />
              </div>
              <Button onClick={() => onInsertTemplate(template)}>Insert</Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TemplatesModal

