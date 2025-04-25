import { uploadAvatar } from '@/api/about/serverActions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCurrentUserImage } from '@/hooks/use-current-user-image';
import { useCurrentUserName } from '@/hooks/use-current-user-name';
import React from 'react';


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
                <Avatar className="h-32 w-32 rounded-lg cursor-pointer">
                    {profileImage && <AvatarImage src={profileImage} alt={initials} />}
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
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