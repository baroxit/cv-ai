import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface CreateCvCtaProps {
	className?: string
}

const CreateCvCta: React.FC<CreateCvCtaProps> = ({ className }) => {
	return (
		<div className={className}>
			<div
				className={cn(
					'p-4 py-2.5 w-fit mx-auto rounded-xl border shadow-md flex gap-4 items-center justify-between bg-background text-foreground gap-24'
				)}
			>
				<p className='text-sm leading-tight text-muted-foreground font-medium text-balance'>
					All set? Let&apos;s build your resume
				</p>
				<Link href='/cv/create'>
					<Button className='group text-sm' size={'sm'}>
						Create new CV
						<ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' />
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default CreateCvCta
