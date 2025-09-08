package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type HelloResponse struct {
	Message string `json:"message"`
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	response := HelloResponse{Message: "Hello from Go API!"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/api/hello", helloHandler)
	log.Println("Server running on http://localhost:4001")
	log.Fatal(http.ListenAndServe(":4001", nil))
}
