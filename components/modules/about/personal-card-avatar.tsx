import { uploadAvatar } from '@/api/about/serverActions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCurrentUserImage } from '@/hooks/use-current-user-image';
import { useCurrentUserName } from '@/hooks/use-current-user-name';
import React from 'react';
import { Camera } from 'lucide-react';


const PersonalCardAvatar: React.FC = () => {
    const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
    const [uploading, setUploading] = React.useState(false);

    const profileImage = useCurrentUserImage()
    const name = useCurrentUserName()
    const initials = name
        ?.split(' ')
        ?.map((word) => word[0])
        ?.join('')
        ?.toUpperCase()
    

    const handleUploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const files = event.target.files;
            if (!files || files.length === 0) {
                throw new Error('You must select an image to upload.');
            }
            const file = files[0];
            const filePath = await uploadAvatar(file);
            setAvatarUrl(filePath);
        } catch (error) {
            console.log(error);
            alert('Error uploading avatar!');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="relative group cursor-pointer">
                    <Avatar className="size-32 rounded-lg border shadow-sm p-0.5 transition-all duration-200 group-hover:opacity-80">
                        {profileImage && <AvatarImage className='rounded-md' src={profileImage} alt={initials} />}
                        <AvatarFallback className='rounded-md'>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <Camera className="size-6 text-white" />
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4">
                <CardTitle className="mb-5">Upload new avatar</CardTitle>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadAvatar}
                    disabled={uploading}
                />
                <Button className="mt-2 w-full" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </Button>
            </PopoverContent>
        </Popover>
    );
};

export default PersonalCardAvatar;