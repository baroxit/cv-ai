"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { useEffect } from "react";
import { WordRotate } from "@/components/magicui/word-rotate"
import { importFromPdf } from "@/api/about/serverActions"

interface DropzoneCvProps {
  onFileSelect?: (file: File) => void
  onReset?: () => void
  allowedFileType?: string
  allowedFileTypeDescription?: string
  className?: string
}

const DropzoneCv = ({ 
  onFileSelect, 
  onReset, 
  allowedFileType = "application/pdf", 
  allowedFileTypeDescription = "PDF",
  className = ""
}: DropzoneCvProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    handleFile(droppedFile)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (droppedFile: File) => {
    if (droppedFile.type !== allowedFileType) {
      toast({
        title: "Invalid file type",
        description: `Please upload a ${allowedFileTypeDescription} file`,
        variant: "destructive",
      })
      return
    }

    setFile(droppedFile)
    //onFileSelect(droppedFile)
    toast({
      title: "File selected",
      description: `${droppedFile.name} is ready to process`,
    })
  }

  const resetForm = () => {
    setFile(null)
    if (onReset) {
      onReset()
    }
  }

  const handleImport = async () => {
    if (!file) return;

    setIsLoading(true);

    try {
      const userData = await importFromPdf(file);
      console.log("Extracted User Data:", userData);

      toast({
        title: "Import Successful",
        description: "Your CV has been successfully imported.",
      });

    } catch (error) {
      toast({
        title: "Import Failed",
        description: "There was an error processing your CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Card
      className={`border-dashed flex flex-col justify-center border-primary/30 items-center text-center ${
        isDragging ? "border-primary bg-primary/5" : ''
      } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
        <CardHeader>
        {file ? (
          <>
            <div className="border p-3 mb-1.5 rounded-xl w-fit mx-auto">
                <Check size={32} strokeWidth={1.3} className="opacity-70" />
            </div>
            <CardTitle>{file.name}</CardTitle>
            <CardDescription>{(file.size / 1024 / 1024).toFixed(2)} MB</CardDescription>
          </>
        ) : (
          <>
            <div className="border p-3 mb-1.5 rounded-xl w-fit mx-auto">
                <Upload size={32} strokeWidth={1.3} className="opacity-70" />
            </div>
            <CardTitle>We got you</CardTitle>
            <CardDescription className="leading-5">Annoying to compile your profile? <br></br> Import everything from your old CV</CardDescription>
          </>
        )}
        </CardHeader>
        <CardContent>
        {!file && (
            <>
            <label htmlFor="file-upload">
                <div className="inline-flex items-center justify-center gap-2 h-9 px-4 py-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90">
                    Select {allowedFileTypeDescription}
                </div>
            </label>
                <input
                id="file-upload"
                type="file"
                accept={allowedFileType}
                className="sr-only"
                onChange={handleFileInput}
                />
            </>
                
        )}

        {file && (
            <div className="flex gap-2">
                <Button variant="secondary" onClick={resetForm}>
                    Cancel
                </Button>
                <Button variant="default" onClick={handleImport} disabled={isLoading}>
                    Import
                </Button>
            </div>
            
        )}
        </CardContent>
    </Card>
    <ProgressDialog openState={isLoading} />
    </>
  )
}


interface ProgressDialogProps {
  openState: boolean;
}

const ProgressDialog: React.FC<ProgressDialogProps> = ({ openState }) => {
  const [open, setOpen] = useState(openState);

  useEffect(() => {
    setOpen(openState);
  }, [openState]);

  return (
    <Dialog open={open}>
      <DialogContent className="md:max-w-3xl lg:w-full [&>button]:hidden pt-8 pb-4 focus:outline-none">
        <DialogHeader className="grid md:grid-cols-2 content-center h-48 px-12">
          <DialogTitle className="flex items-center pl-6">Importing Your Resume...</DialogTitle>
          <DialogDescription className="text-md flex items-center pl-12 ">
            <WordRotate
              className="overflow-hidden py-2 relative"
              words={["Scanning document", "Extracting skills", "Getting experiences", "Analyzing education"]}
              duration={4700}
            />
          </DialogDescription>
        </DialogHeader>
        <div className="w-fit py-1 px-3 hover:border-primary/20 border bg-muted/50 backdrop-blur-sm rounded-full border text-xs font-medium drop-shadow-sm mx-auto">
          Please don't refresh or leave this page while importing
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DropzoneCv