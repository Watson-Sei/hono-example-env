CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`isCompleted` integer DEFAULT false NOT NULL,
	`creatorId` integer NOT NULL,
	`assigneeId` integer,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`creatorId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`assigneeId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `todos_title_unique` ON `todos` (`title`);