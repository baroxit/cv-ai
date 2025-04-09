import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Separator } from '@radix-ui/react-separator'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function LoadingFallback() {
	return (
		<div className='max-w-6xl w-full mx-auto p-4 space-y-4'>
			<div className='w-full'>
				<Skeleton className='h-60 w-full bg-card' />
			</div>
			<div className='space-y-4'>
				<div className='flex justify-center'>
					<Skeleton className='h-9 w-[450px] bg-card' />
				</div>
				<div className='grid gap-4 md:grid-cols-2'>
					{[1, 2, 3, 4].map((i) => (
						<Skeleton key={i} className='h-48 w-full bg-card' />
					))}
				</div>
			</div>
		</div>
	)
}

async function HomeReport() {
	const currentlyApplying = [
		{ company: 'Google', position: 'Software Engineer' },
		{ company: 'Microsoft', position: 'Product Manager' }
	]

	const waitingResponses = [
		{ company: 'Amazon', position: 'Data Scientist' },
		{ company: 'Meta', position: 'UX Designer' }
	]

	const averageRating = 4.5

	return (
		<div className='max-w-screen-lg px-4 lg:px-0 mx-auto mt-12 space-y-8'>
			{/* Currently Applying At */}
			<Card className='p-6'>
				<CardTitle className='text-xl font-bold'>Currently Applying At</CardTitle>
				<CardDescription className='mt-4'>
					{currentlyApplying.length > 0 ? (
						<ul className='space-y-2'>
							{currentlyApplying.map((application, index) => (
								<li key={index} className='flex justify-between'>
									<span className='font-medium'>{application.company}</span>
									<span className='text-muted-foreground'>{application.position}</span>
								</li>
							))}
						</ul>
					) : (
						<p className='text-muted-foreground'>No active applications.</p>
					)}
				</CardDescription>
			</Card>

			{/* Waiting Responses From */}
			<Card className='p-6'>
				<CardTitle className='text-xl font-bold'>Waiting Responses From</CardTitle>
				<CardDescription className='mt-4'>
					{waitingResponses.length > 0 ? (
						<ul className='space-y-2'>
							{waitingResponses.map((response, index) => (
								<li key={index} className='flex justify-between'>
									<span className='font-medium'>{response.company}</span>
									<span className='text-muted-foreground'>{response.position}</span>
								</li>
							))}
						</ul>
					) : (
						<p className='text-muted-foreground'>No pending responses.</p>
					)}
				</CardDescription>
			</Card>

			{/* Average Rating */}
			<Card className='p-6'>
				<CardTitle className='text-xl font-bold'>Average Rating</CardTitle>
				<CardDescription className='mt-4'>
					<div className='flex items-center space-x-2'>
						<span className='text-3xl font-bold'>{averageRating}</span>
						<span className='text-muted-foreground'>/ 5</span>
					</div>
				</CardDescription>
			</Card>
		</div>
	)
}

export default function Page() {
	return (
		<SidebarInset>
			<header className='flex h-16 shrink-0 items-center gap-2'>
				<div className='flex items-center gap-2 px-4'>
					<SidebarTrigger className='-ml-1' />
					<Separator orientation='vertical' className='mr-2 h-4' />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbPage>About You</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>

			<Suspense fallback={<LoadingFallback />}>
				<HomeReport />
			</Suspense>
		</SidebarInset>
	)
}
