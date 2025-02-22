// src/app/[locale]/blog/security/page.tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileDown } from "lucide-react"
import Image from 'next/image'

export default function SecurityBlogPage() {
  return (
    <div className="py-12">
      <H1 className="text-center mb-12">Sicherheit & Notfallplanung</H1>
      
      {/* PDF Preview & Download Section */}
      <Card className="mb-12 p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* PDF Preview */}
          <div className="w-full md:w-2/3 relative h-[600px] rounded-lg overflow-hidden border">
            <object
              data="/pdfs/notfallplan-template.pdf"
              type="application/pdf"
              className="w-full h-full"
            >
              <Image
                src="/images/pdf-preview.png"
                alt="Notfallplan Preview"
                fill
                className="object-contain"
              />
            </object>
          </div>
          
          {/* Download Section */}
          <div className="w-full md:w-1/3 space-y-4">
            <h3 className="text-2xl font-bold">Notfallplan Template</h3>
            <p className="text-muted-foreground">
              Laden Sie unser professionelles Notfallplan-Template herunter und erstellen Sie Ihren eigenen Notfallplan.
            </p>
            <a 
              href="/pdfs/notfallplan-template.pdf" 
              download
              className="inline-block w-full"
            >
              <Button 
                className="w-full gap-2" 
                size="lg"
              >
                <FileDown className="w-5 h-5" />
                PDF Download
              </Button>
            </a>
          </div>
        </div>
      </Card>

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none">
        <h2>Notfallpläne für Unternehmen: Wann, Warum und Wie?</h2>
        {/* Rest of the content */}
      </div>
    </div>
  )
}