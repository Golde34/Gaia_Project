package main

import (
	"gaia_cron_jobs/internal/cron"
	"log"
)

func main() {
	// Start scheduler
	log.Println("Dynamic cron job service started...")
	cron.ExecuteJob()
}
