"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { CreditCardIcon, FolderIcon, HistoryIcon, KeyIcon, LogOutIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
	{
		title: "Main",
		items: [
			{
				title: "Workflows",
				icon: FolderIcon,
				url: "/workflows",
			},
			{
				title: "Credentials",
				icon: KeyIcon,
				url: "/credentials",
			},
			{
				title: "Executions",
				icon: HistoryIcon,
				url: "/executions",
			},
		],
	},
];

export const AppSidebar = () => {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenuItem>
					<SidebarMenuButton asChild className="gap-x-4 px-4 h-10">
						<Link href="/" prefetch>
							<Image src="/logo.svg" alt="NodeBase" width={40} height={40} />
							<span className="font-semibold text-xl">NodeBase</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarHeader>
			<SidebarContent>
				{menuItems.map((group) => (
					<SidebarGroup key={group.title}>
						<SidebarMenu>
							{group.items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										tooltip={item.title}
										isActive={item.url === "/" ? pathname === "/" : pathname.startsWith(item.url)}
										className="gap-x-4 h-10 px-4"
										asChild>
										<Link href={item.url} prefetch>
											<item.icon className="size-4" />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton tooltip="Upgrade to Pro" className="gap-x-4 h-10 px-4" onClick={() => {}}>
							<StarIcon className="size-4" />
							<span>Upgrade to Pro</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton tooltip="Billing Portal" className="gap-x-4 h-10 px-4" onClick={() => {}}>
							<CreditCardIcon className="size-4" />
							<span>Billing Portal</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip="Sign out"
							className="gap-x-4 h-10 px-4"
							onClick={() =>
								authClient.signOut({
									fetchOptions: {
										onSuccess: () => {
											router.push("/sign-in");
										},
									},
								})
							}>
							<LogOutIcon className="size-4" />
							<span>Sign out</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};
