package main

import (
	"fmt"
	"net/http"
	"backend/Router"
)

func main() {
	fmt.Println("Backend Service Running at 3003")

	r := Router.Router()
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Backend Service Running at 3003"))
	})
	_ = http.ListenAndServe(":3003", r)
}
