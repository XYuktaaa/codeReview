CREATE TABLE `analysis` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`snippet_id` integer NOT NULL,
	`analysis_type` text NOT NULL,
	`prompt` text NOT NULL,
	`response` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`snippet_id`) REFERENCES `code_snippet`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `code_snippet` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`language` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
