package controllers

import (
	"encoding/json"
	"net/http"
)

type Data struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func GetData(w http.ResponseWriter, r *http.Request) {
	data := []string{"Data 1", "Data 2", "Data 3"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data);
}

func PostData(w http.ResponseWriter, r *http.Request) {
	var newData Data
	err := json.NewDecoder(r.Body).Decode(&newData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newData);
}