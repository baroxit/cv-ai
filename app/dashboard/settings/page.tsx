import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { ThemeModeSelectorPreview } from '@/components/theme-mode-selector-preview'

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
								<BreadcrumbPage>Settings</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>

			<Suspense fallback={<LoadingFallback />}>
				<div className='max-w-6xl w-full mx-auto p-4 relative space-y-4'>
					<div className='space-y-0.5'>
						<h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
						<p className='text-muted-foreground'>Manage your account settings and preferences.</p>
					</div>

					<div className='grid gap-6 md:grid-cols-2'>
						<div className='md:col-span-2'>
							{/* Appearance Settings */}
							<Card>
								<CardHeader>
									<CardTitle>Appearance</CardTitle>
									<CardDescription>Customize how the application looks on your device.</CardDescription>
									<Separator className='!mt-3' />
								</CardHeader>
								<CardContent className='space-y-4'>
									<div className='flex items-center justify-between'>
										<div>
											<Label htmlFor='theme-mode'>Theme Mode</Label>
											<p className='text-sm text-muted-foreground'>Choose how the theme is determined</p>
										</div>
										{/* <ThemeModeSelector /> */}
										<ThemeModeSelectorPreview />
									</div>
									<div className='flex items-center justify-between'>
										<div>
											<Label htmlFor='reduced-motion'>Reduced Motion</Label>
											<p className='text-sm text-muted-foreground'>Reduce motion effects in the interface</p>
										</div>
										<Switch id='reduced-motion' />
									</div>
									<div className='flex items-center justify-between'>
										<div>
											<Label htmlFor='font-size'>Font Size</Label>
											<p className='text-sm text-muted-foreground'>
												Adjust the size of text throughout the application
											</p>
										</div>
										<Select defaultValue='medium'>
											<SelectTrigger className='w-32'>
												<SelectValue placeholder='Select size' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='small'>Small</SelectItem>
												<SelectItem value='medium'>Medium</SelectItem>
												<SelectItem value='large'>Large</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Account Settings */}
						<Card>
							<CardHeader>
								<CardTitle>Account</CardTitle>
								<CardDescription>Manage your account information and security settings.</CardDescription>
								<Separator className='!mt-3' />
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex items-center justify-between'>
									<div>
										<Label>Email Address</Label>
										<p className='text-sm text-muted-foreground'>example@email.com</p>
									</div>
									<Button variant='outline' size='sm'>
										Change
									</Button>
								</div>
								<div className='flex items-center justify-between'>
									<div>
										<Label>Password</Label>
										<p className='text-sm text-muted-foreground'>Last changed 3 months ago</p>
									</div>
									<Button variant='outline' size='sm'>
										Update
									</Button>
								</div>
								<div className='flex items-center justify-between'>
									<div>
										<Label htmlFor='two-factor'>Two-Factor Authentication</Label>
										<p className='text-sm text-muted-foreground'>Add an extra layer of security to your account</p>
									</div>
									<Switch id='two-factor' />
								</div>
							</CardContent>
						</Card>

						{/* Notifications Settings */}
						<Card>
							<CardHeader>
								<CardTitle>Notifications</CardTitle>
								<CardDescription>Configure how you want to receive notifications.</CardDescription>
								<Separator className='!mt-3' />
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex items-center justify-between'>
									<div>
										<Label htmlFor='email-notifications'>Email Notifications</Label>
										<p className='text-sm text-muted-foreground'>Receive notifications via email</p>
									</div>
									<Switch id='email-notifications' defaultChecked />
								</div>
								<div className='flex items-center justify-between'>
									<div>
										<Label htmlFor='push-notifications'>Push Notifications</Label>
										<p className='text-sm text-muted-foreground'>Receive notifications on your device</p>
									</div>
									<Switch id='push-notifications' defaultChecked />
								</div>
								<div className='flex items-center justify-between'>
									<div>
										<Label htmlFor='marketing-emails'>Marketing Emails</Label>
										<p className='text-sm text-muted-foreground'>Receive emails about new features and updates</p>
									</div>
									<Switch id='marketing-emails' />
								</div>
							</CardContent>
						</Card>

						{/* Privacy Settings */}
						<Card>
							<CardHeader>
								<CardTitle>Privacy</CardTitle>
								<CardDescription>Manage your privacy and data settings.</CardDescription>
								<Separator className='!mt-3' />
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex items-center justify-between'>
									<div>
										<Label htmlFor='analytics'>Usage Analytics</Label>
										<p className='text-sm text-muted-foreground'>
											Allow us to collect anonymous usage data to improve the application
										</p>
									</div>
									<Switch id='analytics' defaultChecked />
								</div>
								<div className='flex items-center justify-between'>
									<div>
										<Label htmlFor='data-sharing'>Data Sharing</Label>
										<p className='text-sm text-muted-foreground'>
											Allow sharing of non-personal data with our partners
										</p>
									</div>
									<Switch id='data-sharing' />
								</div>
								<div className='mt-6'>
									<Button variant='destructive'>Delete Account</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</Suspense>
		</SidebarInset>
	)
}
