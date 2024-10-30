'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

async function uploadFile(formData: FormData) {
    const file = formData.get('file') as File
    const unlockTime = formData.get('unlockTime') as string

    if (!file) {
        throw new Error('No file provided')
    }

    try {
        const response = await fetch(`/api/upload?filename=${file.name}&unlockTime=${unlockTime}`, {
            method: 'POST',
            body: file,
        })

        if (!response.ok) {
            throw new Error('Upload failed')
        }

        return await response.json()
    } catch (error) {
        console.error('Error uploading file:', error)
        throw error
    }
}

export default function FileUploader() {
    const [file, setFile] = useState<File | null>(null)
    const [unlockTime, setUnlockTime] = useState('')
    const [uploadedFileInfo, setUploadedFileInfo] = useState<{ url: string, unlockTime: string } | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file || !unlockTime) return

        setIsUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('unlockTime', unlockTime)

        try {
            const result = await uploadFile(formData)
            setUploadedFileInfo(result)
            router.refresh()
        } catch (error) {
            console.error('Error uploading file:', error)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>File Uploader with Unlock Time</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="file">Select a file</Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="unlockTime">Set unlock time</Label>
                        <Input
                            id="unlockTime"
                            type="datetime-local"
                            value={unlockTime}
                            onChange={(e) => setUnlockTime(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isUploading}>
                        {isUploading ? 'Uploading...' : 'Upload File'}
                    </Button>
                </form>
            </CardContent>
            {uploadedFileInfo && (
                <CardFooter className="flex flex-col items-start space-y-2">
                    <h3 className="font-semibold">Uploaded File Info:</h3>
                    <p>Unlock Time: {new Date(uploadedFileInfo.unlockTime).toLocaleString()}</p>
                    {uploadedFileInfo.url.endsWith('.jpg') || uploadedFileInfo.url.endsWith('.jpeg') || uploadedFileInfo.url.endsWith('.png') ? (
                        <img src={uploadedFileInfo.url} alt="Uploaded file preview" className="mt-2 w-full max-w-xs" />
                    ) : (
                        <a href={uploadedFileInfo.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Download Uploaded File
                        </a>
                    )}
                </CardFooter>
            )}
        </Card>
    )
}