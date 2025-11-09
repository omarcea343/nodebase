"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogoutButton } from "./logout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { data } = useQuery(trpc.getWorkflows.queryOptions());

	const testAI = useMutation(
		trpc.testAI.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
				toast.success("AI Job queued");
			},
		})
	);

	const create = useMutation(
		trpc.createWorkflow.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
				toast.success("Workflow created");
			},
		})
	);

	return (
		<div className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-y-6">
			Protected Server Component
			<div>{JSON.stringify(data, null, 2)}</div>
			<Button disabled={create.isPending} onClick={() => create.mutate()}>
				Create Workflow
			</Button>
			<Button disabled={testAI.isPending} onClick={() => testAI.mutate()}>
				Test AI
			</Button>
			<LogoutButton />
		</div>
	);
};

export default Page;
