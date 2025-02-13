'use client'
 
import { useParams } from 'next/navigation'
import React from 'react';
import { ExperienceSchema } from '@/utils/schemas';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { addExperienceToCv } from '@/api/cv/serverActions';
import { useRouter } from 'next/navigation'


interface AddToCvButtonProps {
    experience: ExperienceSchema;
}
const AddToCvButton: React.FC<AddToCvButtonProps> = ({ experience }) => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter()

    const handleClick = async () => {
        try {

            await addExperienceToCv(id, experience)  // Update to handle education data
        } catch (error) {
            console.error('Submission error:', error)
        } finally {
            router.refresh()
            console.log('Experience added to CV')
        }
    }

    return (
        
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="outline">
                <Plus /> Add to CV
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Do you want to add this experience to your CV?</AlertDialogTitle>
            <AlertDialogDescription>
            This action is reversible and will not modify other experiences.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClick}>Add Experience</AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    );
};

export default AddToCvButton;
