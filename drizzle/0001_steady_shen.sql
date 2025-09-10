CREATE TABLE `code_reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`code` text NOT NULL,
	`language` text NOT NULL,
	`bugs_count` integer DEFAULT 0 NOT NULL,
	`optimizations_count` integer DEFAULT 0 NOT NULL,
	`time_complexity` text,
	`space_complexity` text,
	`analysis_result` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);

